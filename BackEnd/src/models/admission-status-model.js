import mongoose from "mongoose";

// Clear the model cache to prevent 'Cannot overwrite model' errors
if (mongoose.connection.models['AdmissionStatus']) {
  delete mongoose.connection.models['AdmissionStatus'];
}

const AdmissionStatusSchema = new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "schools",
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "students",
    required: true
  },
  details: {
    class: { type: String },
    session: { type: String },
    applicationStart: { type: Date },
    applicationEnd: { type: Date },
    applicationFee: { type: Number },
    status: {
      type: String,
      required: true,
      enum: [
        "SUBMITTED",
        "WRITTEN_EXAM_SCHEDULED",
        "WRITTEN_EXAM_COMPLETED",
        "INTERVIEW_SCHEDULED",
        "INTERVIEW_COMPLETED",
        "SELECTED",
        "WAITLISTED",
        "REJECTED"
      ]
    },
    notes: { type: String },
    scheduledDates: {
      writtenExam: { type: Date },
      interview: { type: Date }
    }
  }
}, { timestamps: true });

// Create the model
const AdmissionStatus = mongoose.model("AdmissionStatus", AdmissionStatusSchema);

export default AdmissionStatus;
