import {
  addInternationalExposureService,
  getInternationalExposureBySchoolIdService,
  updateInternationalExposureService
} from '../services/international-exposure-services.js';

/**
 * Controller to add international exposure details.
 */
export const addInternationalExposure = async (req, res) => {
  try {
    const newDetails = await addInternationalExposureService(req.body);
    res.status(201).json({
      status: "success",
      message: "International exposure details added successfully",
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
 * Controller to get international exposure details by school ID.
 */
export const getInternationalExposureById = async (req, res) => {
  try {
    const { id: schoolId } = req.params;
    const details = await getInternationalExposureBySchoolIdService(schoolId);

    if (!details) {
      return res.status(404).json({
        status: 'failed',
        message: 'International exposure details not found for this school.'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'International exposure details fetched successfully',
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
 * Controller to update international exposure details.
 */
export const updateInternationalExposure = async (req, res) => {
  try {
    const { id: schoolId } = req.params;
    const updatedDetails = await updateInternationalExposureService(schoolId, req.body);

    if (!updatedDetails) {
      return res.status(404).json({
        status: 'failed',
        message: 'Details not found for this school. Please add them first.'
      });
    }

    res.status(200).json({
      status: "success",
      message: "International exposure details updated successfully",
      data: updatedDetails
    });
  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: error.message
    });
  }
};