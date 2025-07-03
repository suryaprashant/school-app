 import express from "express";
 
import ensureAuthenticated from "../middlewares/validate-token-middleware.js";
import {
    addStudent,
    updateStudent,
    deleteStudent,
    getStudent
} from "../controllers/user-controllers.js";
import {
  addPreference,
  updatePreference,
  getPreference
} from "../controllers/pref-controllers.js";

const router = express.Router();

//USER PROFILE
router.post('/',addStudent );
router.get('/:auth-id',getStudent);
 router.put('/:auth-id', updateStudent);
 router.delete('/:auth-id',deleteStudent);

//Preferences
router.post("/preferences/", addPreference);
router.put("/preferences/:stud-id", updatePreference);
router.get("/preferences/:stud-id", getPreference);

 export default router;