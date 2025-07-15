import Support from '../models/support-model.js';

export const addSupportService = async (supportData) => {
  return await Support.create(supportData);
};

export const getSupportByStudIdService = async (studId) => {
  return await Support.findOne({ studId });
};

export const getSupportBySupIdService = async (supportId) => {
  return await Support.findById(supportId);
};

export const deleteSupportBySupIdService = async (supportId) => {
  return await Support.findByIdAndDelete(supportId);
};