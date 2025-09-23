import StudentApplication, { applicationStatuses } from '../models/application-model.js';

// Get status message based on status
const getStatusMessage = (status, scheduledDates = {}) => {
  const messages = {
    [applicationStatuses.SUBMITTED]: 'Your application has been received and is under review.',
    [applicationStatuses.WRITTEN_EXAM_SCHEDULED]: `Written Exam → Scheduled on ${scheduledDates.writtenExam || 'To be announced'}`,
    [applicationStatuses.WRITTEN_EXAM_COMPLETED]: 'Written Exam → Completed. Awaiting result.',
    [applicationStatuses.INTERVIEW_SCHEDULED]: `Interview → Scheduled on ${scheduledDates.interview || 'To be announced'}`,
    [applicationStatuses.INTERVIEW_COMPLETED]: 'Interview → Completed. Awaiting result.',
    [applicationStatuses.SELECTED]: '🎉 Selected! Please complete admission formalities.',
    [applicationStatuses.WAITLISTED]: '🟡 Waitlisted. We\'ll update you.',
    [applicationStatuses.REJECTED]: '❌ Not Selected. Thank you for applying.'
  };
  return messages[status] || 'Status update received.';
};

export const addStudApplications = async (data, userId) => {
  const applicationData = {
    ...data,
    status: applicationStatuses.SUBMITTED,
    statusHistory: [{
      status: applicationStatuses.SUBMITTED,
      changedBy: userId,
      notes: 'Application submitted by student'
    }]
  };
  
  const studentApplication = new StudentApplication(applicationData);
  return await studentApplication.save();
};

export const getAllStudApplications = async (filters = {}) => {
  const applications = await StudentApplication.find(filters);
  return applications.map(app => ({
    ...app.toObject(),
    statusMessage: getStatusMessage(app.status, app.scheduledDates)
  }));
};

export const getStudApplicationsById = async (studId) => {
  const application = await StudentApplication.findOne({ studId });
  if (!application) return null;
  
  return {
    ...application.toObject(),
    statusMessage: getStatusMessage(application.status, application.scheduledDates)
  };
};

export const updateStudApplications = async (studId, data, userId) => {
  const updateData = { ...data };
  
  // If status is being updated, add to status history
  if (data.status) {
    updateData.$push = {
      statusHistory: {
        status: data.status,
        changedBy: userId,
        changedAt: new Date(),
        notes: data.notes || `Status changed to ${data.status}`,
        metadata: {
          scheduledDate: data.scheduledDate,
          updatedBy: userId
        }
      }
    };
  }
  
  // If scheduling an exam or interview
  if (data.scheduledDates) {
    updateData.$set = updateData.$set || {};
    updateData.$set.scheduledDates = data.scheduledDates;
  }
  
  const updatedApp = await StudentApplication.findOneAndUpdate(
    { studId },
    updateData,
    { new: true }
  );
  
  if (!updatedApp) return null;
  
  return {
    ...updatedApp.toObject(),
    statusMessage: getStatusMessage(updatedApp.status, updatedApp.scheduledDates)
  };
};

export const deleteStudApplications = async (studId) => {
  return await StudentApplication.findOneAndDelete({ studId });
};

// Status update helpers
export const scheduleWrittenExam = async (studId, examDate, userId) => {
  return await updateStudApplications(
    studId,
    {
      status: applicationStatuses.WRITTEN_EXAM_SCHEDULED,
      scheduledDates: { writtenExam: examDate },
      notes: `Written exam scheduled for ${examDate}`
    },
    userId
  );
};

export const markExamCompleted = async (studId, result, userId) => {
  const status = result === 'pass' 
    ? applicationStatuses.WRITTEN_EXAM_COMPLETED 
    : applicationStatuses.REJECTED;
    
  return await updateStudApplications(
    studId,
    {
      status,
      notes: `Written exam ${result === 'pass' ? 'completed successfully' : 'result: failed'}`
    },
    userId
  );
};

export const scheduleInterview = async (studId, interviewDate, userId) => {
  return await updateStudApplications(
    studId,
    {
      status: applicationStatuses.INTERVIEW_SCHEDULED,
      scheduledDates: { interview: interviewDate },
      notes: `Interview scheduled for ${interviewDate}`
    },
    userId
  );
};

export const updateFinalStatus = async (studId, status, notes = '', userId) => {
  if (!Object.values(applicationStatuses).includes(status)) {
    throw new Error('Invalid status provided');
  }
  
  return await updateStudApplications(
    studId,
    {
      status,
      notes: notes || `Application status updated to ${status}`
    },
    userId
  );
};
