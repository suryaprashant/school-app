import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  findAdminByEmail,
  createAdmin,
  findAdminById,
  updateAdminById,
  findAllUsers,
  updateUserStatusById,
  findSchoolByIdAndUpdateStatus,
  countTotalUsers,
  countTotalSchools,
} from '../services/admin-sercvices.js';
import School from '../models/school-model.js';

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

// ✅ Update School Status
export const updateSchoolStatus = async (req, res) => {
  const { id } = req.params;
  let { status } = req.body;

  try {
    if (!status)
      return res.status(400).json({ message: 'Status field is required' });

    status = String(status).toLowerCase();
    const validStatuses = ['pending', 'rejected', 'accepted'];
    if (!validStatuses.includes(status))
      return res.status(400).json({
        message: `Invalid status value. Valid values are: ${validStatuses.join(', ')}`,
        providedStatus: status,
      });

    const updatedSchool = await findSchoolByIdAndUpdateStatus(id, status);
    if (!updatedSchool) return res.status(404).json({ message: 'School not found' });

    res.json({ message: `School status updated to ${status}`, school: updatedSchool });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
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

// ✅ Change Password
export const changeAdminPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const admin = await findAdminById(req.admin._id);
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Old password incorrect' });

    admin.password = newPassword;
    await admin.save();
    res.json({ success: true, message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Password change failed', error: err.message });
  }
};

// ✅ Dashboard Stats
export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await countTotalUsers();
    const totalSchools = await countTotalSchools();
    res.json({ success: true, stats: { totalUsers, totalSchools } });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stats', error: err.message });
  }
};

// ✅ All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await findAllUsers();
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users', error: err.message });
  }
};

// ✅ Update User Status
export const updateUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;
    const user = await updateUserStatusById(userId, status);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ success: true, message: 'User status updated', user });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update user', error: err.message });
  }
};
// get pending schools
export const getPendingSchools = async (req, res) => {
  try {
    const status = "pending";
    const schools = await School.find({ status }); // or call your existing service
    res.status(200).json({ status: "success", data: schools });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};
