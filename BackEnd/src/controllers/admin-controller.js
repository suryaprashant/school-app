import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import {
  findAdminByEmail,
  createAdmin,
  findAdminById,
  updateAdminById,
  updateAdminPasswordById,
  findAllUsers,
  updateUserStatusById,
  findSchoolByIdAndUpdateStatus,
  countTotalUsers,
  countTotalSchools,
  findPendingSchools, // ✅ added
} from "../services/admin-sercvices.js";

/* =======================
   🔹 AUTH / ACCOUNT
   ======================= */

// ✅ Register Admin
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: 'All fields are required' });

    const existingAdmin = await findAdminByEmail(email);
    if (existingAdmin) return res.status(400).json({ message: 'Admin already exists' });

    const admin = await createAdmin({ name, email, password });

    const token = jwt.sign({ id: admin._id, userType: 'admin' }, process.env.SECRET, {
      expiresIn: '1d',
    });

    res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email },
    });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

// ✅ Login Admin
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await findAdminByEmail(email);
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id, userType: 'admin' }, process.env.SECRET, {
      expiresIn: '1d',
    });

    res.json({ token, admin });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

// ✅ Admin Profile
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await findAdminById(req.admin._id);
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    res.json({ success: true, admin });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const updateAdminProfile = async (req, res) => {
  try {
    const updatedAdmin = await updateAdminById(req.admin._id, req.body);
    res.json({ success: true, message: 'Profile updated', admin: updatedAdmin });
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};

// ✅ Change Password (uses service)
export const changeAdminPassword = async (req, res) => {
  try {
    const { adminId, oldPassword, newPassword } = req.body;
    const admin = await findAdminById(adminId);

    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Old password incorrect" });

    await updateAdminPasswordById(adminId, newPassword);

    res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* =======================
   🔹 USERS
   ======================= */
export const getAllUsers = async (req, res) => {
  try {
    const users = await findAllUsers();
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const user = await updateUserStatusById(id, status);
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* =======================
   🔹 SCHOOLS
   ======================= */
export const updateSchoolStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const school = await findSchoolByIdAndUpdateStatus(id, status);
    res.status(200).json({ success: true, data: school });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Pending Schools 
export const getPendingSchools = async (req, res) => {
  try {
    const schools = await findPendingSchools();
    res.status(200).json({ success: true, data: schools });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* =======================
   🔹 STATS
   ======================= */
export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await countTotalUsers();
    const totalSchools = await countTotalSchools();
    res.json({ success: true, stats: { totalUsers, totalSchools } });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stats', error: err.message });
  }
};
