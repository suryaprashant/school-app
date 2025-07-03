import Preference from "../models/pref-model.js";

// POST /
export const addPreference = async (req, res) => {
  try {
    const { studentId,state, city, boards, preferredStandard, interests, schoolType, shift } = req.body;

    const existing = await Preference.findOne({ studentId });
    if (existing) {
      return res.status(400).json({ status: "Preference already exists for this student",message:error.message });
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
    res.status(201).json({ status :"success",message: "Preference added successfully",data:{preference: newPref} });
  } catch (err) {
    res.status(500).json({status: "Failed to add preference", message: error.message });
  }
};

// PUT /:stud-id
export const updatePreference = async (req, res) => {
  try {
    const { studId } = req.params;
    const updates = req.body;

    const updated = await Preference.findOneAndUpdate({ studentId: studId }, updates, { new: true });

    if (!updated) {
      return res.status(404).json({ status: "Preference not found for this student",message : error.message });
    }

    res.status(200).json({ status:"success",message: "Preference updated successfully", data:{preference: updated} });
  } catch (err) {
    res.status(500).json({ status: "Failed to update preference", message: error.message });
  }
};



// GET /:stud-id
export const getPreference = async (req, res) => {
  try {
    const { studId } = req.params;

    const preference = await Preference.findOne({ studentId: studId }).populate("studentId");

    if (!preference) {
      return res.status(404).json({ status: "Preference not found",message:error.message });
    }

    res.status(200).json(preference);
  } catch (err) {
    res.status(500).json({status: "Failed to fetch preference", message: error.message });
  }
};
