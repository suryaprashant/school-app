import express from "express";
import { 
  addPreference, 
  updatePreference, 
  getPreference, 
  predictSchoolPerformance 
} from "../controllers/pref-controllers.js";

const router = express.Router();

// Add new preference
router.post("/", addPreference);

// Update preference
router.put("/:studId", updatePreference);

// Get preference by student ID
router.get("/:studId", getPreference);

// Predict schools based on student preference
router.get("/predict/:studentId", predictSchoolPerformance);

export default router;
