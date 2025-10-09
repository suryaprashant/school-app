import Admin from "../models/admin-model.js";
import User from "../models/user-model.js";
import School from "../models/school-model.js";

/* =======================
   🔹 ADMIN OPERATIONS
   ======================= */
export const findAdminByEmail = async (email) => Admin.findOne({ email });

export const createAdmin = async (data) => Admin.create(data);

export const findAdminById = async (id) => Admin.findById(id);

export const updateAdminById = async (id, updateData) =>
  Admin.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: false });

// ✅ Update admin password
export const updateAdminPasswordById = async (id, newPassword) =>
  Admin.findByIdAndUpdate(id, { $set: { password: newPassword } }, { new: true });

/* =======================
   🔹 USER OPERATIONS
   ======================= */
export const findAllUsers = async () => User.find();

export const updateUserStatusById = async (id, status) =>
  User.findByIdAndUpdate(id, { $set: { status } }, { new: true });

export const countTotalUsers = async () => User.countDocuments();

/* =======================
   🔹 SCHOOL OPERATIONS
   ======================= */
export const countTotalSchools = async () => School.countDocuments();

export const findSchoolByIdAndUpdateStatus = async (id, status) =>
  School.findByIdAndUpdate(id, { $set: { status } }, { new: true, runValidators: false });

// ✅ Get all pending schools
export const findPendingSchools = async () => School.find({ status: "pending" });
