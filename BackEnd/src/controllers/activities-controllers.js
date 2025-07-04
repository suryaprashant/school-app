import Activities from '../models/activities-model.js';

//Add Activities
export const addActivities = async (req, res) => {
  try {
    const { schoolId, activities } = req.body;

    const addActivities = await Activities({
    schoolId, 
    activities
    });

    await addActivities.save();

    res.status(201).json({ 
        status: "success",
        message: 'Activities added successfully',
        data: addActivities });
  }
  catch (error) {
    res.status(500).json({ 
    status: 'Failed to add activities', 
    message: error.message });
  } 
};

//Get activities by id
export const getActivitiesById = async (req, res) => {
  try {
    const { id: schoolId } = req.params;

    const getActivities = await Activities.findOne({ schoolId });

    if (!getActivities) {
      return res.status(404).json({ 
        status: 'fail',
        message: 'No activities found' });
    }

    res.status(200).json({
      status: 'success',
      message: 'Activities fetched successfully',
      data: getActivities
    });
  } catch (error) {
    res.status(500).json({
      status: 'Failed to fetch Activities',
      message: error.message
    });
  }
};

// Update activities 
export const updateActivities = async (req, res) => {
  try {
    const { id: schoolId } = req.params;
    const { activities } = req.body;

    const updatedActivities = await Activities.findOneAndUpdate(
      {schoolId},                           
      {activities},                
      { new: true }                                           
    );

    if (!updatedActivities) {
      return res.status(404).json({
        status: 'fail',
        message: 'activities not found for this school. Please add them first.'
      });
    }

    res.status(200).json({ 
        status: "success",
        message: "activities updated successfully", 
        data: updatedActivities });

  } catch (error) {
    res.status(500).json({ 
    status: 'Failed to update activities ', 
    message: error.message });
  }
};