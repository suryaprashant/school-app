import Admission from "../models/admission-model.js";

// POST - Add admission details for a school
export const addAdmissionDetails = async (req, res) => {
  try {
    const data = { ...req.body, schoolId: req.params.id };
    const admission = new Admission(data);
    const savedAdmission = await admission.save();

    res.status(201).json({
      status: "success",
      message: "Admission details added successfully",
      data: savedAdmission,
    });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

// GET - Get admission details for a school
export const getAdmissionDetails = async (req, res) => {
  try {
    const schoolId = req.params.id;
    const admissions = await Admission.find({ schoolId });

    res.status(200).json({
      status: "success",
      data: admissions,
    });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

// PUT - Update admission details by admission _id
export const updateAdmissionDetails = async (req, res) => {
  try {
    const admissionId = req.params.id;
    const updates = req.body;

    const updatedAdmission = await Admission.findByIdAndUpdate(admissionId, updates, { new: true });

    if (!updatedAdmission)
      return res.status(404).json({ status: "failed", message: "Admission not found" });

    res.status(200).json({
      status: "success",
      message: "Admission details updated successfully",
      data: updatedAdmission,
    });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

// DELETE - Delete admission by _id
export const deleteAdmissionDetails = async (req, res) => {
  try {
    const admissionId = req.params.id;

    const deletedAdmission = await Admission.findByIdAndDelete(admissionId);

    if (!deletedAdmission)
      return res.status(404).json({ status: "failed", message: "Admission not found" });

    res.status(200).json({
      status: "success",
      message: "Admission deleted successfully",
      data: deletedAdmission,
    });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};
