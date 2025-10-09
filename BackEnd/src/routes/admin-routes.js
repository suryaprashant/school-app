import express from 'express';
import { 
  registerAdmin, 
  loginAdmin, 
  getAdminProfile, 
  updateAdminProfile, 
  changeAdminPassword, 
  getAdminStats, 
  getAllUsers, 
  updateUserStatus 
} from '../controllers/admin-controller.js';
import { protectAdmin } from '../middlewares/adminAuth-middleware.js';

const router = express.Router();

// Admin authentication
router.post('/auth/register', registerAdmin);
router.post('/auth/login', loginAdmin);

// Admin profile
router.get('/profile', protectAdmin, getAdminProfile);
router.patch('/profile', protectAdmin, updateAdminProfile);
router.patch('/change-password', protectAdmin, changeAdminPassword);

// Admin dashboard
router.get('/stats', protectAdmin, getAdminStats);

// User management
router.get('/users', protectAdmin, getAllUsers);
router.patch('/users/:userId/status', protectAdmin, updateUserStatus);

export default router;
