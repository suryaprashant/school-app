import mongoose from 'mongoose';

const AcademicsSchema = new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'schools',
    required: true,
    unique: true
  },
  averageClass10Result: {
    type: Number,
    min: 0,
    max: 100,
    description: "Average percentage for Class 10 board exams"
  },
  averageClass12Result: {
    type: Number,
    min: 0,
    max: 100,
    description: "Average percentage for Class 12 board exams"
  },

  averageSchoolMarks: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
    description: "Average marks of all standards combined"
  },
  specialExamsTraining: {
    type: [String],
    enum: ['NEET', 'IIT-JEE', 'Olympiads', 'UPSC', 'CLAT', 'SAT/ACT', 'NTSE', 'KVPY']
  },
  extraCurricularActivities: {
    type: [String],
    default: []
  }
}, { timestamps: true });

const Academics = mongoose.model('academics', AcademicsSchema);

export default Academics;