import express from 'express';
import {
  addStudApplication,
  getAllStudApplication,
  getStudApplicationById,
  updateStudApplication,
  deleteStudApplication,
  scheduleExam,
  completeExam,
  scheduleStudentInterview,
  updateApplicationStatus
} from '../controllers/application-controllers.js';
import { protect, restrictTo } from '../middlewares/auth-middleware.js';

const router = express.Router();

// Public routes (if any)

// Protected routes (require authentication)
router.use(protect);

// Student can submit their own application
router.post('/', addStudApplication);

// Admin/Staff can view all applications
router.get('/', restrictTo('admin', 'staff'), getAllStudApplication);

// Get specific application (student can view their own, admin/staff can view any)
router.get('/:studId', getStudApplicationById);

// Student can update their own application (if status allows)
router.put('/:studId', updateStudApplication);

// Admin/Staff only routes
router.use(restrictTo('admin', 'staff'));

// Schedule written exam
router.post('/:studId/schedule-exam', scheduleExam);

// Mark exam as completed (pass/fail)
router.post('/:studId/complete-exam', completeExam);

// Schedule interview
router.post('/:studId/schedule-interview', scheduleStudentInterview);

// Update application status (for final decisions)
router.patch('/:studId/status', updateApplicationStatus);

// Delete application (admin only)
router.delete('/:studId', restrictTo('admin'), deleteStudApplication);

export default router;
