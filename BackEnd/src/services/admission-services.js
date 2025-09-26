import Admission from "../models/admission-model.js";

// Add new admission details
export const addAdmissionService = async (data) => {
  const admission = new Admission(data);
  return await admission.save();
};

// Get admission details by schoolId
export const getAdmissionBySchoolService = async (schoolId) => {
  return await Admission.find({ schoolId });
};

// Update admission details by schoolId
export const updateAdmissionBySchoolService = async (schoolId, updates) => {
  return await Admission.findOneAndUpdate(
    { schoolId },
    { $set: updates },
    { new: true }
  );
};
