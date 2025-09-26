import {
  addPreferenceService,
  getPreferenceService
} from "../services/pref-services.js";
import { predictSchoolsService } from "../services/predictor-services.js";
import Student from "../models/user-model.js"; // Ensure this path is correct

// Predict schools based on student preferences
export const predictSchoolPerformance = async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({
        status: "failed",
        message: "Student ID is required"
      });
    }

    // Fetching student preferences
    const preference = await getPreferenceService(studentId);

    // Mapping preferences to predictor filters
    const filters = {
      state: preference.state,
      city: preference.city,
      board: preference.boards,
      upto: preference.preferredStandard,
      schoolMode: preference.schoolType,
      shifts: [preference.shift],
      activities: preference.interests ? preference.interests : [],
      feeRange: preference.feeRange
    };

    // Call predictor service
    const matchedSchools = await predictSchoolsService(filters);

    return res.status(200).json({
      status: "success",
      message: "Schools predicted successfully",
      data: matchedSchools
    });

  } catch (err) {
    res.status(err.status || 500).json({ status: "failed", message: err.message });
  }
};

// Add new preference
export const addPreference = async (req, res) => {
  try {
    const data = await addPreferenceService(req.body);
    res.status(201).json({ status: "success", message: "Preference added successfully", data });
  } catch (err) {
    res.status(err.status || 500).json({ status: "failed", message: err.message });
  }
};

// Update preference
export const updatePreference = async (req, res) => {
  try {
    const { studId } = req.params;
    const updates = req.body;

    console.log('Updating preferences for student ID:', studId);
    console.log('Received updates:', updates);

    // Check if student exists
    const existingStudent = await Student.findOne({ authId: studId });
    console.log('Found student:', existingStudent ? existingStudent._id : 'Not found');

    if (!existingStudent) {
      return res.status(404).json({ 
        status: 'failed', 
        message: 'Student not found with the provided ID' 
      });
    }

    // Update the preferences
    const updatedStudent = await Student.findOneAndUpdate(
      { authId: studId },
      { $set: { preferences: updates } },
      { new: true, runValidators: true }
    );

    console.log('Updated student:', updatedStudent);

    res.status(200).json({
      status: 'success',
      message: 'Preferences updated successfully',
      data: {
        preferences: updatedStudent.preferences || {},
        studentId: updatedStudent._id
      }
    });
  } catch (err) {
    console.error('Error updating preferences:', err);
    res.status(500).json({ 
      status: 'failed', 
      message: err.message || 'Error updating preferences',
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};

// Get preference
export const getPreference = async (req, res) => {
  try {
    const { studId } = req.params;
    console.log('Fetching preferences for student ID:', studId);

    const student = await Student.findOne({ authId: studId }).select('preferences');
    console.log('Found student preferences:', student ? 'Found' : 'Not found');

    if (!student) {
      return res.status(404).json({ 
        status: 'failed', 
        message: 'Student not found with the provided ID' 
      });
    }

    res.status(200).json({ 
      status: 'success', 
      message: 'Preference fetched successfully', 
      data: student.preferences || {} 
    });
  } catch (err) {
    console.error('Error fetching preferences:', err);
    res.status(500).json({ 
      status: 'failed', 
      message: err.message || 'Error fetching preferences' 
    });
  }
};
