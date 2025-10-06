import SafetyAndSecurity from '../models/safety-security-model.js';

/**
 * Adds new safety and security details for a school.
 */
export const addSafetyAndSecurityService = async (data) => {
  const newDetails = new SafetyAndSecurity(data);
  return await newDetails.save();
};

/**
 * Retrieves safety and security details by schoolId.
 */
export const getSafetyAndSecurityBySchoolIdService = async (schoolId) => {
  return await SafetyAndSecurity.findOne({ schoolId });
};

/**
 * Updates safety and security details by schoolId.
 */
export const updateSafetyAndSecurityService = async (schoolId, updateData) => {
  return await SafetyAndSecurity.findOneAndUpdate(
    { schoolId },
    { $set: updateData },
    { new: true, runValidators: true }
  );
};