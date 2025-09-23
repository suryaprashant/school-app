import mongoose from 'mongoose';

const AmenitiesSchema = new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'schools',
    required: true,
    unique: true
  },
 predefinedAmenities: [{
  type: String,
  enum: [
    "Library",
    "ComputerLab",
    "ScienceLab",
    "Playground",
    "SportsComplex",
    "Auditorium",
    "Cafeteria",
    "Hostel",
    "Transportation",
    "MedicalFacility",
    "Counseling",
    "SmartClassrooms",
    "SwimmingPool",
    "MusicRoom",
    "ArtRoom",
    "CCTV",
    "WiFi",
    "Parking",
    "Security"
  ]
}],

  customAmenities: {
    type: [String],
     required: false
  }
}, { timestamps: true });

const Amenities = mongoose.model('amenities', AmenitiesSchema);
export default Amenities;
