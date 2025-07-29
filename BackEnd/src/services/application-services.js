import StudentApplication from '../models/application-model.js';

export const addStudApplications = async (data) => {
  const studentApplication = new StudentApplication(data);
  return await studentApplication.save();
};

export const getAllStudApplications = async () => {
  return await StudentApplication.find();
};

export const getStudApplicationsById = async (studId) => {
  return await StudentApplication.findOne({ studId });
};


export const updateStudApplications = async (studId, data) => {
  return await StudentApplication.findOneAndUpdate(
    { studId },  data,
    { new: true }
  );
};


export const deleteStudApplications = async (studId) => {
  return await StudentApplication.findOneAndDelete({ studId });
};
