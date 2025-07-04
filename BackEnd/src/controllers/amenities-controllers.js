import Amenities from '../models/amenities-model.js';

//Add amenities
export const addAmenities = async (req, res) => {
  try {
    const { schoolId, predefinedAmenities = [], customAmenities = [] } = req.body;

    const addAmenities = new Amenities({
    schoolId, 
    predefinedAmenities,
    customAmenities
    });

    await addAmenities.save();

    res.status(201).json({ 
        status: "success",
        message: "Amenities added successfully",
        data: addAmenities });

  } catch (error) {
    res.status(500).json({ 
    status: 'Failed to add amenities', 
    message: error.message });
  }
};

// Get amenities by Id 
export const getAmenitiesById = async (req, res) => {
  try {
     const {id: schoolId } = req.params;

    const getAmenities = await Amenities.findOne({ schoolId });

    if (!getAmenities) {
      return res.status(404).json({
        status: 'fail',
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
      status: 'Failed to fetch Amenities',
      message: error.message
    });
  }
};

// Update amenities
export const updateAmenities = async (req, res) => {
  try {
    const { id: schoolId } = req.params;
    const { predefinedAmenities = [], customAmenities = [] } = req.body;

    const updatedAmenities = await Amenities.findOneAndUpdate(
      {schoolId},                           
      { predefinedAmenities, customAmenities },                
      { new: true }                                           
    );

    if (!updatedAmenities) {
      return res.status(404).json({
        status: 'fail',
        message: 'Amenities not found for this school. Please add them first.'
      });
    }

    res.status(200).json({ 
        status: "success",
        message: "Amenities updated successfully", 
        data: updatedAmenities });

  } catch (error) {
    res.status(500).json({ 
    status: 'Failed to update amenities', 
    message: error.message });
  }
};

