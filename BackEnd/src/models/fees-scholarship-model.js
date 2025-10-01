import mongoose from 'mongoose';

// Sub-schema for an individual class fee structure
const ClassFeeSchema = new mongoose.Schema({
  className: { type: String, required: true },
  tuition: { type: Number, required: true, min: 0 },
  activity: { type: Number, default: 0, min: 0 },
  transport: { type: Number, default: 0, min: 0 },
  hostel: { type: Number, default: 0, min: 0 },
  misc: { type: Number, default: 0, min: 0 }
});

// Sub-schema for an individual scholarship
const ScholarshipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true, min: 0 },
  type: {
    type: String,
    required: true,
    enum: ['Merit', 'Socio-economic', 'Cultural', 'Sports', 'Community', 'Academic Excellence']
  },
  documentsRequired: {
    type: [String],
    enum: ['Income Certificate', 'Caste Certificate', 'Aadhar Card', 'Previous Marksheet', 'Bonafide Certificate', 'Sports Achievement Certificate']
  }
});

// Main schema for the entire page
const FeesAndScholarshipsSchema = new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'schools',
    required: true,
    unique: true
  },
  classFees: [ClassFeeSchema],
  scholarships: [ScholarshipSchema]
}, { timestamps: true });

const FeesAndScholarships = mongoose.model('feesAndScholarships', FeesAndScholarshipsSchema);

export default FeesAndScholarships;