import express from "express";
import { loginUser, registerUser, resetPassword, verifyEmail } from "../controllers/auth-controllers.js";
import ensureAuthenticated from "../middlewares/validate-token-middleware.js";
const router = express.Router();

router.post('/login', loginUser);

router.post('/register', registerUser);

// router.post('/forgot-password');

router.post('/reset-password', ensureAuthenticated, resetPassword);

// router.post('/google');

router.get('/verify-email/:token', verifyEmail);

export default router;