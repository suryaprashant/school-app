import Alumni from "../models/alumni-model.js";

// POST /alumni
export const addAlumni = async (req, res) => {
  try {
    const { schoolId, topAlumnis, famousAlumnies, alumnis } = req.body;

    // Check if already exists
    const existing = await Alumni.findOne({ schoolId });
    if (existing) {
      return res.status(400).json({ status: "failed", message: "Alumni data already exists for this school" });
    }

    const newAlumni = new Alumni({
      schoolId,
      topAlumnis,
      famousAlumnies,
      alumnis
    });

    await newAlumni.save();
    res.status(201).json({
      status: "success",
      message: "Alumni added successfully",
      data: newAlumni
    });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

// GET /alumni/:schoolId
export const getAlumniBySchool = async (req, res) => {
  try {
    const {id: schoolId } = req.params;

    const alumni = await Alumni.findOne({ schoolId }).populate("schoolId");

    if (!alumni) {
      return res.status(404).json({ status: "failed", message: "No alumni data found for this school" });
    }

    res.status(200).json({
      status: "success",
      data: alumni
    });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

// PUT /alumni/:schoolId
export const updateAlumniBySchool = async (req, res) => {
  try {
    const {id: schoolId} = req.params;
    const updates = req.body;

    const updatedAlumni = await Alumni.findOneAndUpdate(
      { schoolId },
      updates,
      { new: true }
    );

    if (!updatedAlumni) {
      return res.status(404).json({ status: "failed", message: "No alumni data found to update for this school" });
    }

    res.status(200).json({
      status: "success",
      message: "Alumni data updated successfully",
      data: updatedAlumni
    });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

// DELETE /alumni/:schoolId
export const deleteAlumniBySchool = async (req, res) => {
  try {
    const { id: schoolId } = req.params;

    const deleted = await Alumni.findOneAndDelete({ schoolId });

    if (!deleted) {
      return res.status(404).json({ status: "failed", message: "No alumni data found to delete for this school" });
    }

    res.status(200).json({
      status: "success",
      message: "Alumni data deleted successfully"
    });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};
