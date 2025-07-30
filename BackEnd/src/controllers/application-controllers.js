import {
  addStudApplications,
  updateStudApplications,
  deleteStudApplications,
  getAllStudApplications,
  getStudApplicationsById
} from '../services/application-services.js';

export const addStudApplication = async (req, res) => {
  try {
    const applicationData = await addStudApplications(req.body);
    res.status(201).json({
      status: "success",
      message: "Application added successfully",
      data: applicationData
    });
  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: error.message
    });
  }
};

export const getAllStudApplication = async (req, res) => {
  try {
    const applications = await getAllStudApplications();
    res.status(200).json({
      status: "success",
       message: "Fetch All the Applications successfully",
      data: applications
    });
  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: error.message
    });
  }
};

export const getStudApplicationById = async (req, res) => {
  try {
    const application = await getStudApplicationsById(req.params.studId );
    if (!application) {
      return res.status(404).json({
        status: 'Failed',
        message: 'Application not found'
      });
    }
    res.status(200).json({
      status: "success",
       message: "Get an Application successfully",
      data: application
    });
  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: error.message
    });
  }
};

export const updateStudApplication = async (req, res) => {
  try {
    const updatedApplication = await updateStudApplications(req.params.studId , req.body);
    if (!updatedApplication) {
      return res.status(404).json({
        status: 'Failed',
        message: 'Application not found'
      });
    }
    res.status(200).json({
      status: "success",
      message: "Application updated successfully",
      data: updatedApplication
    });
  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: error.message
    });
  }
};

export const deleteStudApplication = async (req, res) => {
  try {
    const deletedApplication = await deleteStudApplications(req.params.studId );
    if (!deletedApplication) {
      return res.status(404).json({
        status: 'Failed',
        message: 'Application not found'
      });
    }
    res.status(200).json({
      status: "success",
      message: "Application deleted successfully",
      data: deletedApplication
    });
  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: error.message
    });
  }
};
