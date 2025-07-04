import mongoose from "mongoose";

const AlumniSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "schools", // Make sure this matches your School model name
      required: true
    },
    topAlumnis: [
      {
        name: {
          type: String,
          required: true
        },
        percentage: {
          type: Number,
          required: true
        }
      }
    ],
    famousAlumnies: [
      {
        name: {
          type: String,
          required: true
        },
        profession: {
          type: String,
          required: true
        }
      }
    ],
    alumnis: [
      {
        name: {
          type: String,
          required: true
        },
        percentage: {
          type: Number,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

const Alumni = mongoose.model("alumnis", AlumniSchema);
export default Alumni;
