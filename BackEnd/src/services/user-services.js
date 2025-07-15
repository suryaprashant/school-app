import Student from "../models/user-model.js";

// Add a new student
export const addStudentService = async (data) => {
  const { authId } = data;

  const existingStudent = await Student.findOne({ authId });
  if (existingStudent) {
    throw {status:400, message:"Student Already Exists"};
  }

  const newStudent = new Student(data);
  return await newStudent.save();
};

// Update student
export const updateStudentService = async (authId, updates) => {
  const updatedStudent = await Student.findOneAndUpdate(
    { authId },
    updates,
    { new: true }
  );

  if (!updatedStudent) {
    throw {status:400, message:"Student Not Found"};
  }

  return updatedStudent;
};

// Delete student
export const deleteStudentService = async (authId) => {
  const deletedStudent = await Student.findOneAndDelete({ authId });

  if (!deletedStudent) {
     throw {status:400, message:"Student Not Found"};
  }

  return deletedStudent;
};

// Get student
export const getStudentService = async (authId) => {
  const student = await Student.findOne({ authId });

  if (!student) {
    throw {status:400, message:"Student Not Found"};
  }

  return student;
};
