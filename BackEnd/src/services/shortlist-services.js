import Student from "../models/user-model.js";
import School from "../models/school-model.js";
import mongoose from "mongoose";

// ✅ Add School to Shortlist
export const addToShortlistService = async ({ authId, schoolId }) => {
  if (!authId || !schoolId) {
    throw new Error("authId and schoolId are required");
  }

  const student = await Student.findOne({ authId: new mongoose.Types.ObjectId(authId) });
  if (!student) {
    throw new Error("Student not found");
  }

  const school = await School.findById(schoolId);
  if (!school) {
    throw new Error("School not found");
  }

  if (student.shortlistedSchools.includes(schoolId)) {
    throw new Error("School already in shortlist");
  }

  student.shortlistedSchools.push(schoolId);
  await student.save();

  return student.shortlistedSchools;
};

// ✅ Get Shortlisted Schools
export const getShortlistedSchoolsService = async (authId) => {
  const student = await Student.findOne({ authId }).populate("shortlistedSchools");
  if (!student) {
    throw new Error("Student not found");
  }

  return student.shortlistedSchools;
};

// ✅ Remove School from Shortlist
export const removeShortlistService = async ({ authId, schoolId }) => {
  if (!authId || !schoolId) {
    throw new Error("authId and schoolId are required");
  }

  const student = await Student.findOne({ authId: new mongoose.Types.ObjectId(authId) });
  if (!student) {
    throw new Error("Student not found");
  }

  student.shortlistedSchools = student.shortlistedSchools.filter(
    (id) => id.toString() !== schoolId
  );

  await student.save();
  return student.shortlistedSchools;
};

// ✅ Get Count of Shortlisted Schools
export const getShortlistCountService = async (authId) => {
  const student = await Student.findOne({ authId });
  if (!student) {
    throw new Error("Student not found");
  }

  return student.shortlistedSchools.length;
};
