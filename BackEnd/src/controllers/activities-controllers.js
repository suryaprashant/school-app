import {
  addActivitiesService,
  getActivitiesBySchoolIdService,
  updateActivitiesService
} from '../services/activities-services.js';


//Add Activities
export const addActivities = async (req, res) => {
  try {
    const { schoolId, activities } = req.body;

    const savedActivities = await addActivitiesService({ schoolId, activities });

    res.status(201).json({ 
        status: "success",
        message: 'Activities added successfully',
        data: savedActivities });
  }
  catch (error) {
    res.status(500).json({ 
    status: 'Failed', 
    message: error.message });
  } 
};

//Get activities by id
export const getActivitiesById = async (req, res) => {
  try {
    const { id: schoolId } = req.params;

    const getActivities = await getActivitiesBySchoolIdService(schoolId);

    if (!getActivities) {
      return res.status(404).json({
        status: 'failed',
        message: 'No activities found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Activities fetched successfully',
      data: getActivities
    });
  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: error.message
    });
  }
};

// Update activities 
export const updateActivities = async (req, res) => {
  try {
    const { id: schoolId } = req.params;
    const { activities } = req.body;

    const updatedActivities = await updateActivitiesService(schoolId, activities);

    if (!updatedActivities) {
      return res.status(404).json({
        status: 'failed',
        message: 'activities not found for this school. Please add them first.'
      });
    }

    res.status(200).json({ 
        status: "success",
        message: "activities updated successfully", 
        data: updatedActivities });

  } catch (error) {
    res.status(500).json({ 
    status: 'Failed', 
    message: error.message });
  }
};