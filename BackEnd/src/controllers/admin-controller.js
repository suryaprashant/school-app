import Admin from '../models/admin-model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import School from '../models/school-model.js';

// Admin registration
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ message: 'Admin already exists' });

    const admin = new Admin({ name, email, password });
    await admin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

// Admin login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    res.json({ token, admin });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

// Get school status
export const getSchoolStatus = async (req, res) => {
    const { id } = req.params;
  
    try {
      const school = await School.findById(id).select('name status _id');
      if (!school) return res.status(404).json({ message: 'School not found' });
  
      res.json({ school });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error });
    }
  };

// Admin accept/reject school
export const updateSchoolStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // "Accepted" or "Rejected"
  
    try {
      const school = await School.findById(id);
      if (!school) return res.status(404).json({ message: 'School not found' });
  
      school.status = status;
      await school.save();
  
      res.json({ message: `School status updated to ${status}`, school });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error });
    }
  };