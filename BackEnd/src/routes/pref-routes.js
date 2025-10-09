import express from "express";
import { 
  addPreference, 
  updatePreference, 
  getPreference, 
  predictSchoolPerformance,
  getSchoolRecommendations
} from "../controllers/pref-controllers.js";

const router = express.Router();

// Predict schools based on student preference
router.get("/predict/:studentId", predictSchoolPerformance);

// Get school recommendations based on preferences
router.get("/:studId/recommendations", getSchoolRecommendations);

// Update preference
router.put("/:studId", updatePreference);

// Add new preference
router.post("/", addPreference);

// Get preference by student ID
router.get("/:studId", getPreference);

export default router;
