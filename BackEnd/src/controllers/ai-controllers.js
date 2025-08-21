import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import AiModel from '../models/ai-model.js';
import School from '../models/school-model.js';
import { convertSchoolsToAiModels } from '../utils/ai-utils.js';
import mongoose from 'mongoose';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const askOpenAI = async (req, res) => {
  try {
    const aiModel = new AiModel(req.body);

    let matchingSchools = [];

    let initialResults = [];

   

    if (aiModel.from === 'User') {
      // Step 1: Mandatory filters – fetch from DB
      const dbQuery = {};
      if (aiModel.state) dbQuery.state = aiModel.state;
      if (aiModel.board) dbQuery.board = aiModel.board;

      initialResults = await School.find(dbQuery);

      // Only query DB if state and board are provided
      if (Object.keys(dbQuery).length > 0) {

      // Optional filters (any one match is enough)
      const optionalChecks = [
        (school) => aiModel.schoolMode && school.schoolMode === aiModel.schoolMode,
        (school) => aiModel.schoolShift && school.shifts?.includes(aiModel.schoolShift),
        (school) => aiModel.genderType && school.genderType === aiModel.genderType,
        (school) => aiModel.languageMedium && school.languageMedium?.includes(aiModel.languageMedium),
        (school) => aiModel.fees && school.feeRange === aiModel.fees, // Adjust fee matching as needed
      ];

      matchingSchools = initialResults.filter((school) =>
        optionalChecks.some((check) => check(school))
      );

      // If no optional filters are provided, return all results
      const hasAtLeastOneOptionalFilter = [
        aiModel.schoolMode,
        aiModel.schoolShift,
        aiModel.genderType,
        aiModel.languageMedium,
        aiModel.fees,
      ].some(Boolean);

      if (!hasAtLeastOneOptionalFilter) {
        matchingSchools = initialResults;
      }

    }
    }


 const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash-latest" });

     //const result = await model.generateContent(getPrompt(matchingSchools,aiModel));
   // const response = await result.response;
    //const text = response.text();

    res.json({
      reply: getPrompt(matchingSchools,aiModel),
      data:await  getSchool(getSchoolIds([1,2],matchingSchools))
    });
  } catch (error) {
    console.error('Error in askOpenAI:', error);
    res.status(500).json({
      error: 'Error contacting Gemini AI or querying database',
      errorMessage: error.message,
    });
  }
};


function getSchoolIds(answer,schools){
 let ids=[]

  answer.map(ans=>{
ids.push(schools[ans-1]._id);
  })
  return ids
}

async function getSchool(ids) {
  const schools = await Promise.all(
    ids.map(id => School.findById(new mongoose.Types.ObjectId(id)).lean())  // no need to wrap in ObjectId unless required
  );
  return schools.filter(Boolean); // drop nulls
}

function getPrompt(schools,model){

  return formatAiModels(convertSchoolsToAiModels(schools),model)
};
function formatAiModels(aiModels,userPref) {
  if (!Array.isArray(aiModels) || aiModels.length === 0) {
    throw new Error("aiModels must be a non-empty array.");
  }


  if (!userPref) {
    throw new Error("No user preference found in the list.");
  }

  // Format attributes into key:value string
  const formatAttributes = (model) => {
    const attrs = [

      ['fees', model.fees],
      ['board', model.board],
      ['state', model.state],
      ['schoolMode', model.schoolMode],
      ['schoolShift', model.schoolShift],
      ['genderType', model.genderType],
      ['languageMedium', model.languageMedium],
      ['activities', model.activities.join('|')],
      ['amenities', model.amenities.join('|')]
    ].filter(([_, value]) => value && value !== '' && value.length !== 0);

    return attrs.map(([key, value]) => `${key}:${value}`).join(', ');
  };

  // Build User Preference string
  let result = `User Pref: ${formatAttributes(userPref)}\n\nRecommendation List:\n`;

  // Get only SERVER entries
  const serverModels = aiModels.filter(m => m.from === 'Server');

  serverModels.forEach((model, index) => {
    result += `${index + 1} ${model.name} – ${formatAttributes(model)}\n`;
  });

result+="\n\nTell only the serial number of the best three college based on user pref no need to explain anything.In the format (1,2,3)"


  return result;
}

function stringToIntList(str) {
    return str
        .replace(/[()\n\s]/g, '') // remove (), newlines, and spaces
        .split(',')
        .filter(x => x)           // remove empty strings
        .map(Number);             // convert to numbers
}

