import Academics from '../models/academics-model.js';

/**
 * Adds new academic details for a school.
 */
export const addAcademicsService = async (data) => {
  const newAcademics = new Academics(data);
  return await newAcademics.save();
};

/**
 * Retrieves academic details by schoolId.
 */
export const getAcademicsBySchoolIdService = async (schoolId) => {
  return await Academics.findOne({ schoolId });
};

/**
 * Updates academic details by schoolId.
 */
export const updateAcademicsService = async (schoolId, updateData) => {
  return await Academics.findOneAndUpdate(
    { schoolId },
    { $set: updateData },
    { new: true, runValidators: true }
  );
};