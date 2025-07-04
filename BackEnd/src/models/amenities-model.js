import mongoose from 'mongoose';

const AmenitiesSchema = new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'schools',
    required: true,
    unique: true
  },
  predefinedAmenities: {
    type: [String],
    default: []
  },
  customAmenities: {
    type: [String],
     required: false
  }
}, { timestamps: true });

const Amenities = mongoose.model('amenities', AmenitiesSchema);
export default Amenities;
