import {
  addPreferenceService,
  updatePreferenceService,
  getPreferenceService
} from "../services/pref-services.js";
import { predictSchoolsService } from "../services/predictor-services.js";


// to predict student performance

export const predictSchoolPerformance = async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({
        status: "Failed",
        message: "Student ID is required"
      });
    }

    // fetching student preferences
    const preference = await getPreferenceService(studentId);

    // Mapping preference to predictor filters
    const filters = {
      state: preference.state,
      city: preference.city,
      board: preference.boards,
      upto: preference.preferredStandard,
      schoolMode: preference.schoolType,
      shifts: [preference.shift],          // predictor expects an array
      activities: preference.interests ? [preference.interests] : [],
      feeRange: preference.feeRange
    };

    // calling predictor service
    const matchedSchools = await predictSchoolsService(filters);

    // return result to student
    return res.status(200).json({
      status: "success",
      message: "Schools predicted successfully",
      data: matchedSchools
    });

  } catch (err) {
    res.status(err.status || 500).json({ status: "failed", message: err.message });
  }
};

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
