import FeesAndScholarships from '../models/fees-scholarship-model.js';

/**
 * Adds new fees and scholarships details for a school.
 */
export const addFeesAndScholarshipsService = async (data) => {
  const newDetails = new FeesAndScholarships(data);
  return await newDetails.save();
};

/**
 * Retrieves fees and scholarships details by schoolId.
 */
export const getFeesAndScholarshipsBySchoolIdService = async (schoolId) => {
  return await FeesAndScholarships.findOne({ schoolId });
};

/**
 * Updates fees and scholarships details by schoolId.
 */
export const updateFeesAndScholarshipsService = async (schoolId, updateData) => {
  return await FeesAndScholarships.findOneAndUpdate(
    { schoolId },
    { $set: updateData },
    { new: true, runValidators: true }
  );
};