import { applicationStatuses } from '../models/application-model.js';

/**
 * Get a friendly status message based on the application status
 * @param {string} status - The application status
 * @param {Object} scheduledDates - Object containing scheduled dates
 * @returns {string} A user-friendly status message
 */
export const getStatusMessage = (status, scheduledDates = {}) => {
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

// Add more status-related utility functions here if needed