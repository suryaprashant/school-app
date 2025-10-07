import {
  addAcademicsService,
  getAcademicsBySchoolIdService,
  updateAcademicsService
} from '../services/academics-services.js';

export const addAcademics = async (req, res) => {
  try {
    const newDetails = await addAcademicsService(req.body);
    res.status(201).json({
      status: "success",
      message: "Academic details added successfully",
      data: newDetails
    });
  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: error.message
    });
  }
};

export const getAcademicsById = async (req, res) => {
  try {
    const { id: schoolId } = req.params;
    const details = await getAcademicsBySchoolIdService(schoolId);

    if (!details) {
      return res.status(404).json({
        status: 'failed',
        message: 'Academic details not found for this school.'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Academic details fetched successfully',
      data: details
    });
  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: error.message
    });
  }
};


export const updateAcademics = async (req, res) => {
  try {
    const { id: schoolId } = req.params;
    const updatedDetails = await updateAcademicsService(schoolId, req.body);

    if (!updatedDetails) {
      return res.status(404).json({
        status: 'failed',
        message: 'Details not found for this school. Please add them first.'
      });
    }

    res.status(200).json({
      status: "success",
      message: "Academic details updated successfully",
      data: updatedDetails
    });
  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: error.message
    });
  }
};