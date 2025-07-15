// services/pref-service.js
import Preference from "../models/pref-model.js";

// Add preference
export const addPreferenceService = async (data) => {
  const { studentId } = data;

  const existing = await Preference.findOne({ studentId });
  if (existing) {
    throw {status:400, message:"Preference already exists for this student"};
  }

  const newPref = new Preference(data);
  return await newPref.save();
};

// Update preference
export const updatePreferenceService = async (studId, updates) => {
  const updated = await Preference.findOneAndUpdate(
    { studentId: studId },
    updates,
    { new: true }
  );

  if (!updated) {
    throw {status:400, message:"Preference not found for this student"};
  }

  return updated;
};

// Get preference
export const getPreferenceService = async (studId) => {
  const preference = await Preference.findOne({ studentId: studId }).populate("studentId");

  if (!preference) {
    throw {status:400, message:"Preference not found"};
  }

  return preference;
};
