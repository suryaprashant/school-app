import mongoose from 'mongoose';

// 1. Define the application statuses
const applicationStatuses = {
  SUBMITTED: 'submitted',
  WRITTEN_EXAM_SCHEDULED: 'written_exam_scheduled',
  WRITTEN_EXAM_COMPLETED: 'written_exam_completed',
  INTERVIEW_SCHEDULED: 'interview_scheduled',
  INTERVIEW_COMPLETED: 'interview_completed',
  SELECTED: 'selected',
  WAITLISTED: 'waitlisted',
  REJECTED: 'rejected'
};

// 2. Create the schema
const StudentApplicationSchema = new mongoose.Schema({
  studId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student', 
    required: true 
  },
  status: {
    type: String,
    enum: Object.values(applicationStatuses),
    default: applicationStatuses.SUBMITTED,
    required: true
  },
  statusHistory: [{
    status: { 
      type: String, 
      enum: Object.values(applicationStatuses) 
    },
    changedAt: { 
      type: Date, 
      default: Date.now 
    },
    changedBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    },
    notes: String
  }],
  scheduledDates: {
    writtenExam: Date,
    interview: Date
  },
  examResult: {
    type: String,
    enum: ['pass', 'fail', null],
    default: null
  },
  // Add other fields as needed
  name: String,
  course: String,
  // ... other fields
}, { 
  timestamps: true 
});

// 3. Add any pre-save hooks if needed
StudentApplicationSchema.pre('save', function(next) {
  // Add any pre-save logic here
  next();
});

// At the end of the file
const StudentApplicationModel = mongoose.model('StudentApplication', StudentApplicationSchema);
export { StudentApplicationModel as StudentApplication, applicationStatuses };