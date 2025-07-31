// models/studentPdf-model.js
import mongoose from "mongoose";

const StudentPdfSchema = new mongoose.Schema({
  studId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "students", // Reference to the student profile
    required: true,
    unique: true,
  },
  pdfFile: {
    data: Buffer,
    contentType: { type: String, default: "application/pdf" },
  },
}, { timestamps: true });

const StudentPdf = mongoose.model("pdfs", StudentPdfSchema);
export default StudentPdf;
