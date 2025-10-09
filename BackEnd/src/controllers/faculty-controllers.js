import {
  addFacultyService,
  getFacultyBySchoolIdService,
  updateFacultyService
} from '../services/faculty-services.js';

/**
 * Controller to add faculty details.
 */
export const addFaculty = async (req, res) => {
  try {
    const newDetails = await addFacultyService(req.body);
    res.status(201).json({
      status: "success",
      message: "Faculty details added successfully",
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
 * Controller to get faculty details by school ID.
 */
export const getFacultyById = async (req, res) => {
  try {
    const { id: schoolId } = req.params;
    const details = await getFacultyBySchoolIdService(schoolId);

    if (!details) {
      return res.status(404).json({
        status: 'failed',
        message: 'Faculty details not found for this school.'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Faculty details fetched successfully',
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
 * Controller to update faculty details.
 */
export const updateFaculty = async (req, res) => {
  try {
    const { id: schoolId } = req.params;
    const updatedDetails = await updateFacultyService(schoolId, req.body);

    if (!updatedDetails) {
      return res.status(404).json({
        status: 'failed',
        message: 'Details not found for this school. Please add them first.'
      });
    }

    res.status(200).json({
      status: "success",
      message: "Faculty details updated successfully",
      data: updatedDetails
    });
  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: error.message
    });
  }
};