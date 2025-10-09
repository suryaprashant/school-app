import AdmissionTimeline from '../models/admission-timeline-model.js';

/**
 * Adds a new admission timeline for a school.
 */
export const addAdmissionTimelineService = async (data) => {
  const newTimeline = new AdmissionTimeline(data);
  return await newTimeline.save();
};

/**
 * Retrieves the admission timeline by schoolId.
 */
export const getAdmissionTimelineBySchoolIdService = async (schoolId) => {
  return await AdmissionTimeline.findOne({ schoolId });
};

/**
 * Updates the admission timeline by schoolId.
 */
export const updateAdmissionTimelineService = async (schoolId, updateData) => {
  return await AdmissionTimeline.findOneAndUpdate(
    { schoolId },
    { $set: updateData },
    { new: true, runValidators: true }
  );
};