import {
  addFeesAndScholarshipsService,
  getFeesAndScholarshipsBySchoolIdService,
  updateFeesAndScholarshipsService
} from '../services/fees-scholarship-services.js';

/**
 * Controller to add fees and scholarships details.
 */
export const addFeesAndScholarships = async (req, res) => {
  try {
    const newDetails = await addFeesAndScholarshipsService(req.body);
    res.status(201).json({
      status: "success",
      message: "Fees and scholarships details added successfully",
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
 * Controller to get fees and scholarships details by school ID.
 */
export const getFeesAndScholarshipsById = async (req, res) => {
  try {
    const { id: schoolId } = req.params;
    const details = await getFeesAndScholarshipsBySchoolIdService(schoolId);

    if (!details) {
      return res.status(404).json({
        status: 'failed',
        message: 'Fees and scholarships details not found for this school.'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Fees and scholarships details fetched successfully',
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
 * Controller to update fees and scholarships details.
 */
export const updateFeesAndScholarships = async (req, res) => {
  try {
    const { id: schoolId } = req.params;
    const updatedDetails = await updateFeesAndScholarshipsService(schoolId, req.body);

    if (!updatedDetails) {
      return res.status(404).json({
        status: 'failed',
        message: 'Details not found for this school. Please add them first.'
      });
    }

    res.status(200).json({
      status: "success",
      message: "Fees and scholarships details updated successfully",
      data: updatedDetails
    });
  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: error.message
    });
  }
};