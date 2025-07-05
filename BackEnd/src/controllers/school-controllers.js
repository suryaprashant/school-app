import School from '../models/school-model.js';

//Add school
export const addSchool = async (req, res) => {
  try {
    const {
      name, description, board, state, city, schoolMode, genderType, shifts, feeRange, upto, email, mobileNo, specialist, tags, website, status
    } = req.body;

    const school = new School({
       name, description, board, state, city, schoolMode, genderType, shifts, feeRange, upto, email, mobileNo, specialist, tags, website, status
    });

    const saveSchool = await school.save();

     res.status(201).json({
      status: "success",
      message: "School added successfully",
      data: saveSchool
    });
  } catch (error) {
    res.status(400).json({ 
    status: 'Failed to add school', 
    message: error.message });
  }
   
};

// Get school by Id 
export const getSchoolById = async (req, res) => {
  try {
     const {id: schoolId } = req.params;

    const school = await School.findById(schoolId);

    if (!school) {
      return res.status(404).json({
        status: 'fail',
        message: 'School not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'School fetched successfully',
      data: school
    });
  } catch (error) {
    res.status(500).json({
      status: 'Failed to fetch school',
      message: error.message
    });
  }
};

//Get school by status
export const getSchoolsByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    const allowedStatus = ['pending', 'accepted', 'rejected'];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be pending, accepted, or rejected.'
      });
    }

    const schools = await School.find({ status });

    if (schools.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No schools found with status: ${status}`
      });
    }

    res.status(200).json({
      success: true,
      message: `Fetched schools with status: ${status}`,
      data: schools
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error while fetching schools by status',
      message: error.message
    });
  }
};

//Update school info 
export const updateSchoolInfo = async (req, res) => {
  try {
  const {id: schoolId } = req.params;
  const updatedData = req.body;

    
    const updatedSchool = await School.findByIdAndUpdate(schoolId, updatedData, {
      new: true,
      runValidators: true
    });

    if (!updatedSchool) {
      return res.status(404).json({ message: 'School not found' });
    }

    res.status(200).json({ 
        status: "success",
        message: 'School info updated successfully', 
        data: updatedSchool 
    });
  } catch (error) {
    res.status(400).json({ 
        status: 'Failed to update school info', 
        message: error.message 
    });
  }
};

//Delete school 
export const deleteSchool = async (req, res) => {
  try {
    const {id: schoolId } = req.params;

    const deletedSchool = await School.findByIdAndDelete(schoolId);

    if (!deletedSchool) {
      return res.status(404).json({ message: "School not found" });
    }

    res.status(200).json({
      status: "success",
      message: "School deleted successfully",
      data: deletedSchool
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed to delete school",
      message: error.message
    });
  }
};

