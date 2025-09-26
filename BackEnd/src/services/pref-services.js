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
  try {
    // First, get the existing preference to validate updates
    const existingPref = await Preference.findOne({ studentId: studId });
    if (!existingPref) {
      throw { status: 404, message: "Preference not found for this student" };
    }

    // Update the existing document with new values
    Object.keys(updates).forEach(key => {
      existingPref[key] = updates[key];
    });

    // Save with validation
    const updatedPref = await existingPref.save();
    
    return updatedPref;
  } catch (error) {
    console.error('Error updating preference:', error);
    if (error.name === 'ValidationError') {
      throw { status: 400, message: `Validation error: ${error.message}` };
    }
    throw { status: 500, message: error.message || 'Error updating preference' };
  }
};

// Get preference
export const getPreferenceService = async (studId) => {
  const preference = await Preference.findOne({ studentId: studId }).populate("studentId");

  if (!preference) {
    throw {status:400, message:"Preference not found"};
  }

  return preference;
};
