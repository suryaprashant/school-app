import {
  applicationStatuses,
  getStatusMessage,
  addAdmissionService,
  getAdmissionByStudentService,
  updateAdmissionByStudentService,
  deleteAdmissionByStudentService,
} from "../services/admission-status-services.js";

// Add Admission Status
export const addAdmissionStatus = async (req, res) => {
  try {
    const { schoolId, studentId, details } = req.body;

    if (!schoolId || !studentId || !details) {
      return res.status(400).json({ status: "failed", message: "schoolId, studentId and details are required" });
    }

    const newAdmission = await addAdmissionService({ schoolId, studentId, details });

    res.status(201).json({
      status: "success",
      message: "Admission added successfully",
      data: newAdmission,
    });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

// Get Admission Status by Student
export const getAdmissionStatusByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    const admissionStatus = await getAdmissionByStudentService(studentId);

    if (!admissionStatus) {
      return res.status(404).json({ status: "failed", message: "No admission status found for this student" });
    }

    const friendlyMessage = getStatusMessage(admissionStatus.details.status, admissionStatus.details.scheduledDates);

    res.status(200).json({
      status: "success",
      message: "Admission status fetched successfully",
      data: { ...admissionStatus.toObject(), friendlyMessage },
    });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

// Update Admission Status
export const updateAdmissionStatus = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { details } = req.body;

    const updatedAdmission = await updateAdmissionByStudentService(studentId, details);

    if (!updatedAdmission) {
      return res.status(404).json({ status: "failed", message: "Admission status not found for this student" });
    }

    const friendlyMessage = getStatusMessage(updatedAdmission.details.status, updatedAdmission.details.scheduledDates);

    res.status(200).json({
      status: "success",
      message: "Admission status updated successfully",
      data: { ...updatedAdmission.toObject(), friendlyMessage },
    });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

// Delete Admission Status
export const deleteAdmissionStatus = async (req, res) => {
  try {
    const { studentId } = req.params;

    const deletedAdmission = await deleteAdmissionByStudentService(studentId);

    if (!deletedAdmission) {
      return res.status(404).json({ status: "failed", message: "Admission status not found" });
    }

    res.status(200).json({
      status: "success",
      message: "Admission status deleted successfully",
      data: deletedAdmission,
    });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};
