import express from 'express';
import { registerAdmin, loginAdmin } from '../controllers/admin-controller.js';

const router = express.Router();

// Admin registration
router.post('/auth/register', registerAdmin);

// Admin login
router.post('/auth/login', loginAdmin);

export default router;
