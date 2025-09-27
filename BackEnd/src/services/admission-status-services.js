import AdmissionStatus from "../models/admission-status-model.js";

// Application Status Enum
export const applicationStatuses = {
  SUBMITTED: "SUBMITTED",
  WRITTEN_EXAM_SCHEDULED: "WRITTEN_EXAM_SCHEDULED",
  WRITTEN_EXAM_COMPLETED: "WRITTEN_EXAM_COMPLETED",
  INTERVIEW_SCHEDULED: "INTERVIEW_SCHEDULED",
  INTERVIEW_COMPLETED: "INTERVIEW_COMPLETED",
  SELECTED: "SELECTED",
  WAITLISTED: "WAITLISTED",
  REJECTED: "REJECTED",
};

// Friendly status message
export const getStatusMessage = (status, scheduledDates = {}) => {
  const messages = {
    [applicationStatuses.SUBMITTED]: "Your application has been received and is under review.",
    [applicationStatuses.WRITTEN_EXAM_COMPLETED]: "Written Exam → Completed. Awaiting result.",
    [applicationStatuses.INTERVIEW_COMPLETED]: "Interview → Completed. Awaiting result.",
    [applicationStatuses.SELECTED]: "🎉 Selected! Please complete admission formalities.",
    [applicationStatuses.WAITLISTED]: "🟡 Waitlisted. We’ll update you.",
    [applicationStatuses.REJECTED]: "❌ Not Selected. Thank you for applying.",
  };

  if (status === applicationStatuses.WRITTEN_EXAM_SCHEDULED) {
    return `Written Exam → Scheduled on ${scheduledDates.writtenExam || "[Date & Time]"}`;
  }

  if (status === applicationStatuses.INTERVIEW_SCHEDULED) {
    return `Interview → Scheduled on ${scheduledDates.interview || "[Date & Time]"}`;
  }

  return messages[status] || "Status update received.";
};

// Create admission
export const addAdmissionService = async ({ schoolId, studentId, details }) => {
  const newAdmission = new AdmissionStatus({ schoolId, studentId, details });
  return await newAdmission.save();
};

// Get admission by studentId
export const getAdmissionByStudentService = async (studentId) => {
  return await AdmissionStatus.findOne({ studentId }).populate("schoolId studentId");
};

// Update admission by studentId
export const updateAdmissionByStudentService = async (studentId, details) => {
  return await AdmissionStatus.findOneAndUpdate({ studentId }, { details }, { new: true });
};

// Delete admission by studentId
export const deleteAdmissionByStudentService = async (studentId) => {
  return await AdmissionStatus.findOneAndDelete({ studentId });
};
