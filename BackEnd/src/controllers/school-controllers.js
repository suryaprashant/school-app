import {
  addSchoolService,
  getSchoolByIdService,
  getSchoolsByStatusService,
  updateSchoolInfoService,
  deleteSchoolService
} from '../services/school-services.js';

//Add school
export const addSchool = async (req, res) => {
  try {
    
    const saveSchool = await addSchoolService(req.body);

     res.status(201).json({
      status: "success",
      message: "School added successfully",
      data: saveSchool
    });
  } catch (error) {
    res.status(500).json({ 
    status: 'Failed', 
    message: error.message });
  }
   
};

// Get school by Id 
export const getSchoolById = async (req, res) => {
  try {

    const school = await getSchoolByIdService(req.params.id);

    res.status(200).json({
      status: 'success',
      message: 'School fetched successfully',
      data: school
    });
  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: error.message
    });
  }
};

//Get school by status
export const getSchoolsByStatus = async (req, res) => {
  try {

    const { status } = req.params; 

    const schools = await getSchoolsByStatusService(status);

    res.status(200).json({
      status: 'success',
      message: `Fetched schools with status: ${status}`,
      data: schools
    });
  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: error.message
    });
  }
};

//Update school info 
export const updateSchoolInfo = async (req, res) => {
  try {

  const updatedSchool = await updateSchoolInfoService(req.params.id, req.body);

    res.status(200).json({ 
        status: "success",
        message: 'School info updated successfully', 
        data: updatedSchool 
    });
  } catch (error) {
    res.status(500).json({ 
        status: 'Failed', 
        message: error.message 
    });
  }
};

//Delete school 
export const deleteSchool = async (req, res) => {
  try {
    
   const deletedSchool = await deleteSchoolService(req.params.id);

    res.status(200).json({
      status: "success",
      message: "School deleted successfully",
      data: deletedSchool
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message
    });
  }
};

