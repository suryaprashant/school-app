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

// Update admission details by _id
export const updateAdmissionService = async (admissionId, updates) => {
  return await Admission.findByIdAndUpdate(admissionId, updates, { new: true });
};

// Delete admission details by _id
export const deleteAdmissionService = async (admissionId) => {
  return await Admission.findByIdAndDelete(admissionId);
};
