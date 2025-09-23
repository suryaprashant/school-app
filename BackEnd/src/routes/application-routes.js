import express from "express";
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
} from "../controllers/application-controllers.js";

import { protect, restrictTo } from "../middlewares/auth-middleware.js";

const router = express.Router();

// All routes below require authentication
router.use(protect);

// Student can submit their own application
router.post("/", restrictTo("student"), addStudApplication);

// School users can view all applications
router.get("/", restrictTo("school"), getAllStudApplication);

// Get specific application (student can view their own, school can view any)
router.get("/:studId", getStudApplicationById);

// Student can update their own application
router.put("/:studId", restrictTo("student"), updateStudApplication);

// School-only routes
router.use(restrictTo("school"));

// Schedule written exam
router.post("/:studId/schedule-exam", scheduleExam);

// Mark exam as completed (pass/fail)
router.post("/:studId/complete-exam", completeExam);

// Schedule interview
router.post("/:studId/schedule-interview", scheduleStudentInterview);

// Update application status (final decisions)
router.patch("/:studId/status", updateApplicationStatus);

// Delete application (school only)
router.delete("/:studId", deleteStudApplication);

export default router;
