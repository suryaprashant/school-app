import TechnologyAdoption from '../models/technology-adoption-model.js';

/**
 * Adds new technology adoption details for a school.
 */
export const addTechnologyAdoptionService = async (data) => {
  const newTechAdoption = new TechnologyAdoption(data);
  return await newTechAdoption.save();
};

/**
 * Retrieves technology adoption details by schoolId.
 */
export const getTechnologyAdoptionBySchoolIdService = async (schoolId) => {
  return await TechnologyAdoption.findOne({ schoolId });
};

/**
 * Updates technology adoption details by schoolId.
 */
export const updateTechnologyAdoptionService = async (schoolId, updateData) => {
  return await TechnologyAdoption.findOneAndUpdate(
    { schoolId },
    { $set: updateData },
    { new: true, runValidators: true }
  );
};