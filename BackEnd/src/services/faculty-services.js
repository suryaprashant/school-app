import Faculty from '../models/faculty-model.js';

/**
 * Adds new faculty details for a school.
 */
export const addFacultyService = async (data) => {
  const newFaculty = new Faculty(data);
  return await newFaculty.save();
};

/**
 * Retrieves faculty details by schoolId.
 */
export const getFacultyBySchoolIdService = async (schoolId) => {
  return await Faculty.findOne({ schoolId });
};

/**
 * Updates faculty details by schoolId.
 */
export const updateFacultyService = async (schoolId, updateData) => {
  return await Faculty.findOneAndUpdate(
    { schoolId },
    { $set: updateData },
    { new: true, runValidators: true }
  );
};