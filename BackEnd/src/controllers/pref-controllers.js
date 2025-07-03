import Preference from "../models/pref-model.js";

// POST /
export const addPreference = async (req, res) => {
  try {
    const { studentId,state, city, boards, preferredStandard, interests, schoolType, shift } = req.body;

    const existing = await Preference.findOne({ studentId });
    if (existing) {
      return res.status(400).json({ status: "failed", message:"Preference already exists for this student"});
    }

    const newPref = new Preference({
      studentId,
      state,
      city,
      boards,
      preferredStandard,
      interests,
      schoolType,
      shift
    });

    await newPref.save();
    res.status(201).json({ status :"success", message: "Preference added successfully", data: newPref});
  } catch (err) {
    res.status(500).json({status: "failed", message: err.message });
  }
};

// PUT /:stud-id
export const updatePreference = async (req, res) => {
  try {
    const { studId } = req.params;
    const updates = req.body;

    const updated = await Preference.findOneAndUpdate({ studentId: studId }, updates, { new: true });

    if (!updated) {
      return res.status(404).json({ status: "Preference not found for this student", message : error.message });
    }

    res.status(200).json({ status:"success", message: "Preference updated successfully", data: updated});
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

// GET /:stud-id
export const getPreference = async (req, res) => {
  try {
    const { studId } = req.params;

    const preference = await Preference.findOne({ studentId: studId }).populate("studentId");

    if (!preference) {
      return res.status(404).json({ status: "Preference not found" });
    }

    res.status(200).json({status:"success", message:"Preference updated successfully", data: preference});
  } catch (err) {
    res.status(500).json({status: "failed", message: err.message });
  }
};
