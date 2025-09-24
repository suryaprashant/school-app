// backend/src/controllers/application-controllers.js

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

// Helper to map status to friendly message
const getStatusMessage = (status) => {
  switch (status) {
    case 'submitted': return 'Your application has been received and is under review.';
    case 'written_exam_scheduled': return 'Written exam has been scheduled.';
    case 'written_exam_completed': return 'Written exam completed. Awaiting result.';
    case 'interview_scheduled': return 'Interview has been scheduled.';
    case 'interview_completed': return 'Interview completed. Awaiting result.';
    case 'selected': return '🎉 Selected! Please complete admission formalities.';
    case 'waitlisted': return '🟡 Waitlisted. We’ll update you.';
    case 'rejected': return '❌ Not Selected. Thank you for applying.';
    default: return 'Status updated.';
  }
};

// ----------------- Controllers -----------------

// Student submits application
export const addStudApplication = async (req, res) => {
  try {
    const userId = req.user?._id;
    const applicationData = await addStudApplications(req.body, userId);

    res.status(201).json({
      status: 'success',
      message: getStatusMessage(applicationData.status),
      data: {
        studentId: applicationData.studId,
        course: applicationData.course,
        status: applicationData.status
      }
    });
  } catch (error) {
    handleError(res, error);
  }
};

// School views all applications
export const getAllStudApplication = async (req, res) => {
  try {
    const { status } = req.query;
    const filters = status ? { status } : {};
    const applications = await getAllStudApplications(filters);

    res.status(200).json({
      status: 'success',
      results: applications.length,
      data: applications.map(app => ({
        studentId: app.studId,
        course: app.course,
        status: app.status
      }))
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Get specific application
export const getStudApplicationById = async (req, res) => {
  try {
    const application = await getStudApplicationsById(req.params.studId);

    if (!application) {
      return res.status(404).json({
        status: 'fail',
        message: 'Application not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: getStatusMessage(application.status),
      data: {
        studentId: application.studId,
        course: application.course,
        status: application.status,
        scheduledDates: application.scheduledDates || {}
      }
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Student updates their application
export const updateStudApplication = async (req, res) => {
  try {
    const userId = req.user?._id;
    const updatedApplication = await updateStudApplications(req.params.studId, req.body, userId);

    if (!updatedApplication) {
      return res.status(404).json({
        status: 'fail',
        message: 'No application found with that ID'
      });
    }

    res.status(200).json({
      status: 'success',
      message: getStatusMessage(updatedApplication.status),
      data: {
        studentId: updatedApplication.studId,
        course: updatedApplication.course,
        status: updatedApplication.status
      }
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Schedule written exam (school)
export const scheduleExam = async (req, res) => {
  try {
    const { examDate } = req.body;
    const userId = req.user?._id;
    const applicationId = req.params.studId;

    if (!examDate) {
      return res.status(400).json({
        status: 'fail',
        message: 'Exam date is required'
      });
    }

    const application = await scheduleWrittenExam(applicationId, new Date(examDate), userId);

    res.status(200).json({
      status: 'success',
      message: application.scheduledDates?.writtenExam
        ? `Written exam scheduled on ${new Date(application.scheduledDates.writtenExam).toLocaleString()}`
        : 'Written exam scheduled successfully',
      data: {
        studentId: application.studId,
        course: application.course,
        status: application.status
      }
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Mark written exam completed
export const completeExam = async (req, res) => {
  try {
    const { result } = req.body; // 'pass' or 'fail'
    const userId = req.user?._id;
    const applicationId = req.params.studId;

    if (!['pass', 'fail'].includes(result)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Result must be either "pass" or "fail"'
      });
    }

    const application = await markExamCompleted(applicationId, result, userId);

    res.status(200).json({
      status: 'success',
      message: `Written exam completed. Result: ${application.examResult || result}`,
      data: {
        studentId: application.studId,
        course: application.course,
        status: application.status
      }
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Schedule interview (school)
export const scheduleStudentInterview = async (req, res) => {
  try {
    const { interviewDate } = req.body;
    const userId = req.user?._id;
    const applicationId = req.params.studId;

    if (!interviewDate) {
      return res.status(400).json({
        status: 'fail',
        message: 'Interview date is required'
      });
    }

    const application = await scheduleInterview(applicationId, new Date(interviewDate), userId);

    res.status(200).json({
      status: 'success',
      message: application.scheduledDates?.interview
        ? `Interview scheduled on ${new Date(application.scheduledDates.interview).toLocaleString()}`
        : 'Interview scheduled successfully',
      data: {
        studentId: application.studId,
        course: application.course,
        status: application.status
      }
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Update final status (school)
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const userId = req.user?._id;
    const applicationId = req.params.studId;

    if (!status) {
      return res.status(400).json({
        status: 'fail',
        message: 'Status is required'
      });
    }

    const application = await updateFinalStatus(applicationId, status, notes, userId);

    let statusMessage;
    if (status === 'selected') statusMessage = '🎉 Selected! Please complete admission formalities.';
    else if (status === 'waitlisted') statusMessage = '🟡 Waitlisted. We’ll update you.';
    else if (status === 'rejected') statusMessage = '❌ Not Selected. Thank you for applying.';
    else statusMessage = 'Status updated.';

    res.status(200).json({
      status: 'success',
      message: statusMessage,
      data: {
        studentId: application.studId,
        course: application.course,
        status: application.status
      }
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Delete application (school)
export const deleteStudApplication = async (req, res) => {
  try {
    const applicationId = req.params.studId;
    const deletedApplication = await deleteStudApplications(applicationId);

    if (!deletedApplication) {
      return res.status(404).json({
        status: 'fail',
        message: 'No application found with that ID'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Application deleted successfully',
      data: null
    });
  } catch (error) {
    handleError(res, error);
  }
};
