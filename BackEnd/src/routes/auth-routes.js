import express from "express";
import { loginUser, registerUser } from "../controllers/auth-controllers.js";
import ensureAuthenticated from "../middlewares/validate-token-middleware.js";
const router = express.Router();

router.post('/login', loginUser);

router.post('/register', registerUser);

// router.post('/forgot-password');

// router.post('/reset-password');

// router.post('/google');

// router.get('/verify-email/:token');

export default router;