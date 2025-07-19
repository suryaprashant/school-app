import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'schools',
    required: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 500
  },
  ratings: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  likes: {
    type: Number,
    default: 0,
    min: 0,
  },
  student: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "students",
    default: []
  }]
}, { timestamps: true });

export default mongoose.model('reviews', reviewSchema);