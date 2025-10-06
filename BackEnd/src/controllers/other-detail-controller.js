import {
  addOtherDetailsService,
  getOtherDetailsBySchoolIdService,
  updateOtherDetailsService
} from '../services/other-detail-services.js';

/**
 * Controller to add other details.
 */
export const addOtherDetails = async (req, res) => {
  try {
    const newDetails = await addOtherDetailsService(req.body);
    res.status(201).json({
      status: "success",
      message: "Other details added successfully",
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
 * Controller to get other details by school ID.
 */
export const getOtherDetailsById = async (req, res) => {
  try {
    const { id: schoolId } = req.params;
    const details = await getOtherDetailsBySchoolIdService(schoolId);

    if (!details) {
      return res.status(404).json({
        status: 'failed',
        message: 'Other details not found for this school.'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Other details fetched successfully',
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
 * Controller to update other details.
 */
export const updateOtherDetails = async (req, res) => {
  try {
    const { id: schoolId } = req.params;
    const updatedDetails = await updateOtherDetailsService(schoolId, req.body);

    if (!updatedDetails) {
      return res.status(404).json({
        status: 'failed',
        message: 'Details not found for this school. Please add them first.'
      });
    }

    res.status(200).json({
      status: "success",
      message: "Other details updated successfully",
      data: updatedDetails
    });
  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: error.message
    });
  }
};