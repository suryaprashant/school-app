import Admin from '../models/admin-model.js';
import User from '../models/user-model.js';
import School from '../models/school-model.js';

// ---------- Admin Operations ----------
export const findAdminByEmail = async (email) => Admin.findOne({ email });
export const createAdmin = async (data) => new Admin(data).save();
export const findAdminById = async (id) => Admin.findById(id).select('-password');
export const updateAdminById = async (id, data) =>
  Admin.findByIdAndUpdate(id, data, { new: true, runValidators: true }).select('-password');

// ---------- User Operations ----------
export const findAllUsers = async () => User.find().select('-password');
export const updateUserStatusById = async (userId, status) =>
  User.findByIdAndUpdate(userId, { status }, { new: true });

// ---------- School Operations ----------
export const findSchoolByIdAndUpdateStatus = async (id, status) =>
  School.findByIdAndUpdate(id, { $set: { status } }, { new: true, runValidators: false });

export const countTotalUsers = async () => User.countDocuments();
export const countTotalSchools = async () => School.countDocuments();
