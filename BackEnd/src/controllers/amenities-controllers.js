import {
  addAmenitiesService,
  getAmenitiesBySchoolIdService,
  updateAmenitiesService
} from '../services/amenities-services.js';

//Add amenities
export const addAmenities = async (req, res) => {
  try {
    const { schoolId, predefinedAmenities = [], customAmenities = [] } = req.body;

    const addAmenities = await addAmenitiesService({ schoolId, predefinedAmenities, customAmenities });

    res.status(201).json({ 
        status: "success",
        message: "Amenities added successfully",
        data: addAmenities });

  } catch (error) {
    res.status(500).json({ 
    status: 'Failed', 
    message: error.message });
  }
};

export const getAmenitiesById = async (req, res) => {
  try {
     const {id: schoolId } = req.params;

    const getAmenities = await getAmenitiesBySchoolIdService(schoolId);


    if (!getAmenities) {
      return res.status(404).json({
        status: 'failed',
        message: 'Amenities not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Amenities fetched successfully',
      data: getAmenities
    });
  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: error.message
    });
  }
};

// Update amenities
export const updateAmenities = async (req, res) => {
  try {
    const { id: schoolId } = req.params;
    const { predefinedAmenities = [], customAmenities = [] } = req.body;

    const updatedAmenities =  await updateAmenitiesService(schoolId, predefinedAmenities, customAmenities);
    if (!updatedAmenities) {
      return res.status(404).json({
        status: 'failed',
        message: 'Amenities not found for this school. Please add them first.'
      });
    }

    res.status(200).json({ 
        status: "success",
        message: "Amenities updated successfully", 
        data: updatedAmenities });

  } catch (error) {
    res.status(500).json({ 
    status: 'Failed', 
    message: error.message });
  }
};