import express from "express";
import { loginUser, registerUser, resetPassword, verifyEmail, sendOtp, verifyOtpAndResetPassword } from "../controllers/auth-controllers.js";
import { googleAuth } from "../controllers/google-auth-controllers.js";
import ensureAuthenticated from "../middlewares/validate-token-middleware.js";
const router = express.Router();

router.post('/login', loginUser);

router.post('/register', registerUser);

router.post('/forgot-password/send-otp', sendOtp);
router.post('/forgot-password/verify-otp', verifyOtpAndResetPassword);

router.post('/reset-password', ensureAuthenticated, resetPassword);

router.post('/google', googleAuth);

router.get('/verify-email/:token', verifyEmail);

export default router;