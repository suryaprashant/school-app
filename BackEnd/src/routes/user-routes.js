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

import {
  addToShortlist,
  getShortlistedSchools,
  removeShortlist,
  getShortlistCount,
} from "../controllers/shortlist-controllers.js";


const router = express.Router();

//USER PROFILE
router.post('/', ensureAuthenticated, addStudent);
router.get('/:authId', ensureAuthenticated, getStudent);
router.put('/:authId', ensureAuthenticated, updateStudent);
router.delete('/:authId', ensureAuthenticated, deleteStudent);

//Preferences
router.post("/preferences/", ensureAuthenticated, addPreference);
router.put("/preferences/:studId", ensureAuthenticated, updatePreference);
router.get("/preferences/:studId", ensureAuthenticated, getPreference);

router.post("/shortlist", ensureAuthenticated, addToShortlist);
router.get("/shortlist/:authId", ensureAuthenticated, getShortlistedSchools);
router.get("/shortlist/count/:authId", ensureAuthenticated, getShortlistCount);
router.post("/shortlist/remove", ensureAuthenticated, removeShortlist);

export default router;