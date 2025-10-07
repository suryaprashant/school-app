import mongoose from 'mongoose';

const TechnologyAdoptionSchema = new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'schools',
    required: true,
    unique: true
  },
  smartClassroomsPercentage: {
    type: Number,
    
    min: 0,
    max: 100
  },
  eLearningPlatforms: {
    type: [String],
    default: []
  }
}, { timestamps: true });

const TechnologyAdoption = mongoose.model('technologyAdoption', TechnologyAdoptionSchema);

export default TechnologyAdoption;