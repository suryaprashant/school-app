import Alumni from "../models/alumni-model.js";

// Add alumni
export const addAlumniService = async (data) => {
  const { schoolId } = data;

  const existing = await Alumni.findOne({ schoolId });
  if (existing) {
    throw {status:400, message:"Alumni data already exists for this school"};
  }

  const newAlumni = new Alumni(data);
  return await newAlumni.save();
};

// Get alumni by school
export const getAlumniBySchoolService = async (schoolId) => {
  const alumni = await Alumni.findOne({ schoolId }).populate("schoolId");

  if (!alumni) {
    throw {status:400, message:"No alumni data found for this school"};
  }

  return alumni;
};

// Update alumni by school
export const updateAlumniBySchoolService = async (schoolId, updates) => {
  const updatedAlumni = await Alumni.findOneAndUpdate(
    { schoolId },
    updates,
    { new: true }
  );

  if (!updatedAlumni) {
    throw {status:400, message:"No alumni data found to update for this school"};
  }

  return updatedAlumni;
};

// Delete alumni by school
export const deleteAlumniBySchoolService = async (schoolId) => {
  const deleted = await Alumni.findOneAndDelete({ schoolId });

  if (!deleted) {
    throw {status:400, message:"No alumni data found to delete for this school"}
  }

  return deleted;
};
