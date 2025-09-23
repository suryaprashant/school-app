import {
  addStudApplications,
  updateStudApplications,
  deleteStudApplications,
  getAllStudApplications,
  getStudApplicationsById,
  scheduleWrittenExam,
  markExamCompleted,
  scheduleInterview,
  updateFinalStatus
} from '../services/application-services.js';

// Helper function to handle errors
const handleError = (res, error, statusCode = 500) => {
  console.error('Error:', error);
  return res.status(statusCode).json({
    status: 'error',
    message: error.message || 'An error occurred',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
};

export const addStudApplication = async (req, res) => {
  try {
    const userId = req.user?._id; // Assuming you have user info in req.user from auth middleware
    const applicationData = await addStudApplications(req.body, userId);
    
    res.status(201).json({
      status: 'success',
      message: applicationData.statusMessage || 'Application submitted successfully',
      data: applicationData
    });
  } catch (error) {
    handleError(res, error, error.status || 500);
  }
};

export const getAllStudApplication = async (req, res) => {
  try {
    const { status } = req.query;
    const filters = status ? { status } : {};
    
    const applications = await getAllStudApplications(filters);
    
    res.status(200).json({
      status: 'success',
      results: applications.length,
      data: applications
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const getStudApplicationById = async (req, res) => {
  try {
    const application = await getStudApplicationsById(req.params.studId);
    
    if (!application) {
      return res.status(404).json({
        status: 'fail',
        message: 'No application found with that ID'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: application.statusMessage,
      data: application
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const updateStudApplication = async (req, res) => {
  try {
    const userId = req.user?._id; // Assuming you have user info in req.user
    const updatedApplication = await updateStudApplications(
      req.params.studId, 
      req.body,
      userId
    );
    
    if (!updatedApplication) {
      return res.status(404).json({
        status: 'fail',
        message: 'No application found with that ID'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: updatedApplication.statusMessage || 'Application updated successfully',
      data: updatedApplication
    });
  } catch (error) {
    handleError(res, error);
  }
};

// New controller for scheduling written exam
export const scheduleExam = async (req, res) => {
  try {
    const { examDate } = req.body;
    const userId = req.user?._id;
    
    if (!examDate) {
      return res.status(400).json({
        status: 'fail',
        message: 'Exam date is required'
      });
    }
    
    const result = await scheduleWrittenExam(req.params.studId, new Date(examDate), userId);
    
    res.status(200).json({
      status: 'success',
      message: result.statusMessage,
      data: result
    });
  } catch (error) {
    handleError(res, error);
  }
};

// New controller for marking exam as completed
// New controller for marking exam as completed
export const completeExam = async (req, res) => {
  try {
    const { result } = req.body; // 'pass' or 'fail'
    const userId = req.user?._id;
    
    if (!['pass', 'fail'].includes(result)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Result must be either "pass" or "fail"'
      });
    }
    
    const updatedApp = await markExamCompleted(req.params.studId, result, userId);
    
    res.status(200).json({
      status: 'success',
      message: updatedApp.statusMessage,
      data: updatedApp
    });
  } catch (error) {
    handleError(res, error);
  }
};

// New controller for scheduling interview
export const scheduleStudentInterview = async (req, res) => {
  try {
    const { interviewDate } = req.body;
    const userId = req.user?._id;
    
    if (!interviewDate) {
      return res.status(400).json({
        status: 'fail',
        message: 'Interview date is required'
      });
    }
    
    const result = await scheduleInterview(req.params.studId, new Date(interviewDate), userId);
    
    res.status(200).json({
      status: 'success',
      message: result.statusMessage,
      data: result
    });
  } catch (error) {
    handleError(res, error);
  }
};

// New controller for updating final status
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const userId = req.user?._id;
    
    if (!status) {
      return res.status(400).json({
        status: 'fail',
        message: 'Status is required'
      });
    }
    
    const updatedApp = await updateFinalStatus(req.params.studId, status, notes, userId);
    
    res.status(200).json({
      status: 'success',
      message: updatedApp.statusMessage,
      data: updatedApp
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteStudApplication = async (req, res) => {
  try {
    const deletedApplication = await deleteStudApplications(req.params.studId);
    
    if (!deletedApplication) {
      return res.status(404).json({
        status: 'fail',
        message: 'No application found with that ID'
      });
    }
    
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    handleError(res, error);
  }
};
