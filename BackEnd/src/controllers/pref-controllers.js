import {
  addPreferenceService,
  updatePreferenceService,
  getPreferenceService
} from "../services/pref-services.js";

// POST /
export const addPreference = async (req, res) => {
  try {
    const data = await addPreferenceService(req.body);
    res.status(201).json({ status: "success", message: "Preference added successfully", data });
  } catch (err) {
    res.status(err.status||500).json({ status: "failed", message: err.message });
  }
};

// PUT /:stud-id
export const updatePreference = async (req, res) => {
  try {
    const { studId } = req.params;
    const updates = req.body;

    const data = await updatePreferenceService(studId, updates);
    res.status(200).json({ status: "success", message: "Preference updated successfully", data });
  } catch (err) {
    res.status(err.status||500).json({ status: "failed", message: err.message });
  }
};

// GET /:stud-id
export const getPreference = async (req, res) => {
  try {
    const { studId } = req.params;

    const data = await getPreferenceService(studId);
    res.status(200).json({ status: "success", message: "Preference fetched successfully", data });
  } catch (err) {
    res.status(err.status||500).json({ status: "failed", message: err.message });
  }
};
