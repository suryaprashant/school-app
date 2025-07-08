import School from '../models/school-model.js';

//  Add school
export const addSchoolService = async (data) => {

    const {
      name, description, board, state, city, schoolMode, genderType, shifts, feeRange, upto, email, mobileNo, specialist, tags, website, status
    } = data;

  const school = new School({
       name, description, board, state, city, schoolMode, genderType, shifts, feeRange, upto, email, mobileNo, specialist, tags, website, status
    });

  return await school.save();
};

// Get school by ID
export const getSchoolByIdService = async (schoolId) => {

  const school = await School.findById(schoolId);

  if (!school) {
    const error = new Error('School not found');
    error.statusCode = 404;
    throw error;
  }

  return school;
};

// Get schools by status
export const getSchoolsByStatusService = async (status) => {
  const allowedStatus = ['pending', 'accepted', 'rejected'];
     if (!allowedStatus.includes(status)) {
    const error = new Error('Invalid status. Must be pending, accepted, or rejected.');
    error.statusCode = 400;
    throw error;
  }


  const schools = await School.find({ status });
  
 if (!schools || schools.length === 0) {
    const error = new Error(`No schools found with status: ${status}`);
    error.statusCode = 404;
    throw error;
  }

  return schools;
};

// Update school info
export const updateSchoolInfoService = async (schoolId, data) => {
  const updatedSchool = await School.findByIdAndUpdate(schoolId, data, {
    new: true,
    runValidators: true
  });

  if (!updatedSchool) {
  const error = new Error('School not found');
  error.statusCode = 404;
  throw error;
}

  return updatedSchool;
};

// Delete school
export const deleteSchoolService = async (schoolId) => {
  const deletedSchool = await School.findByIdAndDelete(schoolId);
  if (!deletedSchool) {
  const error = new Error('School not found');
  error.statusCode = 404;
  throw error;
  }

  return deletedSchool;
};
