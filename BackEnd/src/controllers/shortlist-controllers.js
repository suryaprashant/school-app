import Student from "../models/user-model.js";
import School from "../models/school-model.js";
import mongoose from "mongoose";
// ✅ Add School to Shortlist
export const addToShortlist = async (req, res) => {
  try {
    const { authId, schoolId } = req.body;

    if (!authId || !schoolId) {
      return res.status(400).json({ message: "authId and schoolId are required" });
    }

    const student = await Student.findOne({ authId: new mongoose.Types.ObjectId(authId) });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    console.log(schoolId);
      
    const school = await School.findById(schoolId);
    console.log(school)
    if (!school) {
      return res.status(404).json({ message: "School not found" });
    }

    if (student.shortlistedSchools.includes(schoolId)) {
      return res.status(400).json({ message: "School already in shortlist" });
    }

    student.shortlistedSchools.push(schoolId);
    await student.save();

    res.status(200).json({
      message: "School added to shortlist",
      shortlist: student.shortlistedSchools,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// ✅ Get Shortlisted Schools
export const getShortlistedSchools = async (req, res) => {
  try {
    const { authId } = req.params;

    const student = await Student.findOne({ authId }).populate("shortlistedSchools");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Shortlisted schools retrieved",
      shortlist: student.shortlistedSchools,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// ✅ Remove School from Shortlist
export const removeShortlist = async (req, res) => {
  console.log("inn")
  try {
    const { authId, schoolId } = req.body;
console.log(authId)
    if (!authId || !schoolId) {
      return res.status(400).json({ message: "authId and schoolId are required" });
    }
 
    const student = await Student.findOne({ authId: new mongoose.Types.ObjectId(authId) });
   console.log(student)

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }


    // Remove the school from the array
    student.shortlistedSchools = student.shortlistedSchools.filter(
      (id) => id.toString() !== schoolId
    );

    await student.save();

    res.status(200).json({
      message: "School removed from shortlist",
      shortlist: student.shortlistedSchools,
    });
  } catch (error) {
    res.status(500).json({ status: "failedlooserrrr", message: error.message });
  }
};
// ✅ Get Count of Shortlisted Schools
export const getShortlistCount = async (req, res) => {
  try {
    const { authId } = req.params;

    const student = await Student.findOne({ authId });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const count = student.shortlistedSchools.length;
    res.status(200).json({ message: "Shortlist count retrieved", count });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
