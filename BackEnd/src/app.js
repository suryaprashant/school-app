// src/app.js
import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "../config/db.js";

// Routes
import authRoutes from './routes/auth-routes.js';
import userRoutes from './routes/user-routes.js';
import schoolRoutes from './routes/school-routes.js';
import applicationRoutes from './routes/application-routes.js'; 
import reviewRoutes from './routes/review-routes.js';
import openAIRoutes from './routes/ai-routes.js';
import formRoutes from './routes/form-routes.js';
import ChatbotRoutes from './routes/chatbot-routes.js';
import otpRoutes from "./routes/otp-routes.js";
import prefRoutes from "./routes/pref-routes.js";

import { errorHandler } from './middlewares/cloudinary-error-handler.js';

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/schools', schoolRoutes);
app.use('/api/admin', schoolRoutes); // Admin routes for schools   
app.use('/api/application', applicationRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/form', formRoutes);
app.use('/api', openAIRoutes);
app.use('/api/chatbot', ChatbotRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/preferences", prefRoutes);

// Global error handler for cloudinary
app.use(errorHandler);

// Catch-all error handler
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: err.toString()
  });
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
