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
router.post('/', ensureAuthenticated, addStudent);
router.get('/:authId',getStudent);
 router.put('/:authId', updateStudent);
 router.delete('/:authId',deleteStudent);

//Preferences
router.post("/preferences/", addPreference);
router.put("/preferences/:studId", updatePreference);
router.get("/preferences/:studId", getPreference);

 export default router;