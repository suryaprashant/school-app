import express from "express";
import { 
  addPreference, 
  updatePreference, 
  getPreference, 
  predictSchoolPerformance 
} from "../controllers/pref-controllers.js";

const router = express.Router();

// Predict schools based on student preference
router.get("/predict/:studentId", predictSchoolPerformance);


// Update preference
router.put("/:studId", updatePreference);

// Add new preference
router.post("/", addPreference);

// Get preference by student ID
router.get("/:studId", getPreference);



export default router;
