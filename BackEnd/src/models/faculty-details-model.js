import mongoose from "mongoose";

const FacultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  qualification: { type: String, required: true },
  experience: { type: Number, required: true }, // years
});

const SchoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
  // ... other school fields

  facultyDetails: {
    type: [FacultySchema], // array of teachers
    default: []
  }
});

const School = mongoose.model("School", SchoolSchema);
export default School;
