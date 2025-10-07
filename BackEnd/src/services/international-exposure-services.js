import InternationalExposure from '../models/international-exposure-model.js';

/**
 * Adds new international exposure details for a school.
 */
export const addInternationalExposureService = async (data) => {
  const newDetails = new InternationalExposure(data);
  return await newDetails.save();
};

/**
 * Retrieves international exposure details by schoolId.
 */
export const getInternationalExposureBySchoolIdService = async (schoolId) => {
  return await InternationalExposure.findOne({ schoolId });
};

/**
 * Updates international exposure details by schoolId.
 */
export const updateInternationalExposureService = async (schoolId, updateData) => {
  return await InternationalExposure.findOneAndUpdate(
    { schoolId },
    { $set: updateData },
    { new: true, runValidators: true }
  );
};