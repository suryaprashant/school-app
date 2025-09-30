import mongoose from 'mongoose';

const InfrastructureSchema = new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'schools',
    required: true,
    unique: true
  },
  labs: {
    type: [String],
    enum: ['Physics', 'Chemistry', 'Biology', 'Computer', 'Robotics', 'Language']
  },
  sportsGrounds: {
    type: [String],
    enum: ['Football', 'Cricket', 'Basketball', 'Tennis', 'Athletics', 'Badminton']
  },
  libraryBooks: {
    type: Number,
    min: [0, 'Number of books cannot be negative.']
  },
  smartClassrooms: {
    type: Number,
    min: [0, 'Number of smart classrooms cannot be negative.']
  }
}, { timestamps: true });

const Infrastructure = mongoose.model('infrastructure', InfrastructureSchema);

export default Infrastructure;