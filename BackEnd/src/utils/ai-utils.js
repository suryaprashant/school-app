import AiModel from '../models/ai-model.js'; // your AiModel class
import { FromType } from '../models/ai-model.js'; // ensure this is exported from AiModel.js

/**
 * Convert School model documents to AiModel instances
 * @param {Array} schoolList - Array of School model objects (Mongoose docs or plain objects)
 * @returns {AiModel[]} - Array of AiModel instances
 */
export function convertSchoolsToAiModels(schoolList) {
  if (!Array.isArray(schoolList)) {
    throw new Error("schoolList must be an array.");
  }

  return schoolList.map(school => {
    
    return new AiModel({
      _id: school._id?.toString?.() ?? String(school._id), 
      from: FromType.SERVER,
      name: school.name,
      fees: school.feeRange,
      board: school.board,
      state: school.state,
      schoolMode: school.schoolMode,
      schoolShift: Array.isArray(school.shifts) ? school.shifts[0] : school.shifts, // take first shift if multiple
      genderType: school.genderType,
      languageMedium: Array.isArray(school.languageMedium) ? school.languageMedium[0] : school.languageMedium,
      activities: school.specialist || [],
      amenities: school.tags || []
    });
  });
}
