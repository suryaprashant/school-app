import Amenities from '../models/amenities-model.js';

// Add new amenities
export const addAmenitiesService = async ({ schoolId, predefinedAmenities, customAmenities }) => {
  const newAmenities = new Amenities({
    schoolId,
    predefinedAmenities,
    customAmenities
  });
  return await newAmenities.save();
};

// Get amenities by schoolId
export const getAmenitiesBySchoolIdService = async (schoolId) => {
  return await Amenities.findOne({ schoolId });
};

// Update amenities by schoolId
export const updateAmenitiesService = async (schoolId, predefinedAmenities, customAmenities) => {
  return await Amenities.findOneAndUpdate(
    { schoolId },
    { predefinedAmenities, customAmenities },
    { new: true, runValidators: true }  
  );
};
