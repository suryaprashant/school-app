import mongoose from "mongoose";

const AdmissionSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "schools", // Must match your School model name
      required: true
    },
    class: { type: String, required: true },
    session: { type: String, required: true },
    applicationStart: { type: Date, required: true },
    applicationEnd: { type: Date, required: true },
    applicationFee: { type: Number, required: true },
    eligibility: { type: String },
    requiredDocuments: [{ type: String }]
  },
  { timestamps: true }
);

const Admission = mongoose.model("admissions", AdmissionSchema);
export default Admission;
