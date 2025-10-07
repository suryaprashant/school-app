import {
  addSafetyAndSecurityService,
  getSafetyAndSecurityBySchoolIdService,
  updateSafetyAndSecurityService
} from '../services/safety-security-services.js';

/**
 * Controller to add safety and security details.
 */
export const addSafetyAndSecurity = async (req, res) => {
  try {
    const newDetails = await addSafetyAndSecurityService(req.body);
    res.status(201).json({
      status: "success",
      message: "Safety and security details added successfully",
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
 * Controller to get safety and security details by school ID.
 */
export const getSafetyAndSecurityById = async (req, res) => {
  try {
    const { id: schoolId } = req.params;
    const details = await getSafetyAndSecurityBySchoolIdService(schoolId);

    if (!details) {
      return res.status(404).json({
        status: 'failed',
        message: 'Safety and security details not found for this school.'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Safety and security details fetched successfully',
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
 * Controller to update safety and security details.
 */
export const updateSafetyAndSecurity = async (req, res) => {
  try {
    const { id: schoolId } = req.params;
    const updatedDetails = await updateSafetyAndSecurityService(schoolId, req.body);

    if (!updatedDetails) {
      return res.status(404).json({
        status: 'failed',
        message: 'Details not found for this school. Please add them first.'
      });
    }

    res.status(200).json({
      status: "success",
      message: "Safety and security details updated successfully",
      data: updatedDetails
    });
  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: error.message
    });
  }
};