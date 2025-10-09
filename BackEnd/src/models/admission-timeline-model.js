import mongoose from 'mongoose';

// This sub-schema defines a single admission timeline entry
const TimelineEntrySchema = new mongoose.Schema({
  admissionStartDate: {
    type: Date,
    required: true
  },
  admissionEndDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Ongoing', 'Ended', 'Starting Soon'],
    required: true
  },
  documentsRequired: {
    type: [String],
    default: []
  },
  eligibility: {
    admissionLevel: {
      type: String,
      // You can add more levels here as needed, e.g., 'Grade 1-5'
      enum: ['KGs', 'Grade 1 - 5', 'Grade 6-10'],
      required: true,
      description: "The grade level for which this admission timeline applies."
    },
    ageCriteria: {
      type: String,
      trim: true,
      description: "e.g., 'Child must be 3 years old by June 1, 2026.'"
    },
    otherInfo: {
      type: String,
      trim: true,
      description: "Any other eligibility information."
    }
  }
});

// This main schema links the list of timelines to a single school
const AdmissionTimelineSchema = new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'schools',
    required: true,
    unique: true
  },
  // The main field is now an array of the sub-schema defined above
  timelines: [TimelineEntrySchema]
}, { timestamps: true });

const AdmissionTimeline = mongoose.model('AdmissionTimeline', AdmissionTimelineSchema);

export default AdmissionTimeline;