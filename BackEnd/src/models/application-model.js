import mongoose from "mongoose";

// Status constants
export const applicationStatuses = {
  SUBMITTED: "Application Submitted",
  WRITTEN_EXAM_SCHEDULED: "Written Exam Scheduled",
  WRITTEN_EXAM_COMPLETED: "Written Exam Completed",
  INTERVIEW_SCHEDULED: "Interview Scheduled",
  INTERVIEW_COMPLETED: "Interview Completed",
  SELECTED: "Selected",
  WAITLISTED: "Waitlisted",
  REJECTED: "Not Selected",
};

// Student Application Schema
const StudentApplicationSchema = new mongoose.Schema(
  {
    studId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(applicationStatuses),
      default: applicationStatuses.SUBMITTED,
    },
    statusHistory: [
      {
        status: { type: String, enum: Object.values(applicationStatuses) },
        changedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        changedAt: { type: Date, default: Date.now },
        notes: String,
      },
    ],
    scheduledDates: {
      writtenExam: Date,
      interview: Date,
    },
    // You can add more fields if needed
  },
  { timestamps: true }
);

// Named export
export const StudentApplication = mongoose.model(
  "StudentApplication",
  StudentApplicationSchema
);
