import OtherDetails from '../models/other-detail-model.js';

/**
 * Adds new 'other details' for a school.
 */
export const addOtherDetailsService = async (detailsData) => {
  const newDetails = new OtherDetails(detailsData);
  return await newDetails.save();
};

/**
 * Retrieves 'other details' by schoolId.
 */
export const getOtherDetailsBySchoolIdService = async (schoolId) => {
  return await OtherDetails.findOne({ schoolId });
};

/**
 * Updates 'other details' by schoolId.
 */
export const updateOtherDetailsService = async (schoolId, updateData) => {
  return await OtherDetails.findOneAndUpdate(
    { schoolId },
    { $set: updateData },
    { new: true, runValidators: true }
  );
};