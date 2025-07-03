import Preference from "../models/pref-model.js";

// POST /
export const addPreference = async (req, res) => {
  try {
    const { studentId,state, city, boards, preferredStandard, interests, schoolType, shift } = req.body;

    const existing = await Preference.findOne({ studentId });
    if (existing) {
      return res.status(400).json({ message: "Preference already exists for this student" });
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
    res.status(201).json({ message: "Preference added successfully", preference: newPref });
  } catch (err) {
    res.status(500).json({ message: "Failed to add preference", error: err.message });
  }
};

// PUT /:stud-id
export const updatePreference = async (req, res) => {
  try {
    const { studId } = req.params;
    const updates = req.body;

    const updated = await Preference.findOneAndUpdate({ studentId: studId }, updates, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Preference not found for this student" });
    }

    res.status(200).json({ message: "Preference updated successfully", preference: updated });
  } catch (err) {
    res.status(500).json({ message: "Failed to update preference", error: err.message });
  }
};



// GET /:stud-id
export const getPreference = async (req, res) => {
  try {
    const { studId } = req.params;

    const preference = await Preference.findOne({ studentId: studId }).populate("studentId");

    if (!preference) {
      return res.status(404).json({ message: "Preference not found" });
    }

    res.status(200).json(preference);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch preference", error: err.message });
  }
};
