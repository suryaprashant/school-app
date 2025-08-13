import express from "express";

import ensureAuthenticated from "../middlewares/validate-token-middleware.js";

import {
  generateAndSaveStudentPdf,
   viewStudentPDF,
  downloadStudentPdf,
} from "../controllers/student-pdf-controllers.js";

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
router.post("/preferences/",  addPreference);
router.put("/preferences/:studId",  updatePreference);
router.get("/preferences/:studId",  getPreference);

router.post("/shortlist",  addToShortlist);
router.get("/shortlist/:authId",  getShortlistedSchools);
router.get("/shortlist/count/:authId", getShortlistCount);
router.post("/shortlist/remove", removeShortlist);

router.get("/pdf/view/:studId", viewStudentPDF);
router.get("/pdf/download/:studId", downloadStudentPdf);
router.post("/pdf/generate/:studId", generateAndSaveStudentPdf);

export default router;