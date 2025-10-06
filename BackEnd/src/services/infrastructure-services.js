import Infrastructure from '../models/infrastructure-model.js';

/**
 * Adds new infrastructure details for a school.
 */
export const addInfrastructureService = async (infrastructureData) => {
  const newInfrastructure = new Infrastructure(infrastructureData);
  return await newInfrastructure.save();
};

/**
 * Retrieves infrastructure details by schoolId.
 */
export const getInfrastructureBySchoolIdService = async (schoolId) => {
  return await Infrastructure.findOne({ schoolId });
};

/**
 * Updates infrastructure details by schoolId.
 */
export const updateInfrastructureService = async (schoolId, updateData) => {
  return await Infrastructure.findOneAndUpdate(
    { schoolId },
    { $set: updateData },
    { new: true, runValidators: true }
  );
};