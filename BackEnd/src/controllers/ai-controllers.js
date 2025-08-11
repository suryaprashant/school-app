import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import AiModel from '../models/ai-model.js';
import School from '../models/school-model.js';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const askOpenAI = async (req, res) => {
  try {
    const aiModel = new AiModel(req.body);

    let matchingSchools = [];

    let initialResults = [];

    console.log(aiModel.state);
    console.log(aiModel.board);

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

    // // Use the Gemini model
    // const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash-latest" });

    // const result = await model.generateContent('How are you?');
    // const response = await result.response;
    // const text = response.text();

    res.json({
      reply: 'Done',
      data: matchingSchools,
    });
  } catch (error) {
    console.error('Error in askOpenAI:', error);
    res.status(500).json({
      error: 'Error contacting Gemini AI or querying database',
      errorMessage: error.message,
    });
  }
};
