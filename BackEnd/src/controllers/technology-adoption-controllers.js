import {
  addTechnologyAdoptionService,
  getTechnologyAdoptionBySchoolIdService,
  updateTechnologyAdoptionService
} from '../services/technology-adoption-services.js';

/**
 * Controller to add technology adoption details.
 */
export const addTechnologyAdoption = async (req, res) => {
  try {
    const newDetails = await addTechnologyAdoptionService(req.body);
    res.status(201).json({
      status: "success",
      message: "Technology adoption details added successfully",
      data: newDetails
    });
  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: error.message
    });
  }
};

/**
 * Controller to get technology adoption details by school ID.
 */
export const getTechnologyAdoptionById = async (req, res) => {
  try {
    const { id: schoolId } = req.params;
    const details = await getTechnologyAdoptionBySchoolIdService(schoolId);

    if (!details) {
      return res.status(404).json({
        status: 'failed',
        message: 'Technology adoption details not found for this school.'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Technology adoption details fetched successfully',
      data: details
    });
  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: error.message
    });
  }
};

/**
 * Controller to update technology adoption details.
 */
export const updateTechnologyAdoption = async (req, res) => {
  try {
    const { id: schoolId } = req.params;
    const updatedDetails = await updateTechnologyAdoptionService(schoolId, req.body);

    if (!updatedDetails) {
      return res.status(404).json({
        status: 'failed',
        message: 'Details not found for this school. Please add them first.'
      });
    }

    res.status(200).json({
      status: "success",
      message: "Technology adoption details updated successfully",
      data: updatedDetails
    });
  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: error.message
    });
  }
};