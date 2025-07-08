import Activities from '../models/activities-model.js';

// Add new activities
export const addActivitiesService = async ({ schoolId, activities }) => {
  const newActivities = new Activities({ schoolId, activities });
  return await newActivities.save();
};

// Get activities by schoolId
export const getActivitiesBySchoolIdService = async (schoolId) => {
  return await Activities.findOne({ schoolId });
};

// Update activities by schoolId
export const updateActivitiesService = async (schoolId, activities) => {
  return await Activities.findOneAndUpdate(
    { schoolId },
    { activities },
    { new: true , runValidators: true }
  );
};
