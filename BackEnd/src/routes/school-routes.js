import express from "express";

import ensureAuthenticated from "../middlewares/validate-token-middleware.js";
import {addSchool, getSchoolById, getSchoolsByStatus,  updateSchoolInfo, deleteSchool} from '../controllers/school-controllers.js';
import {addAmenities, getAmenitiesById, updateAmenities} from '../controllers/amenities-controllers.js';
import {addActivities, getActivitiesById, updateActivities} from '../controllers/activities-controllers.js';
import {addAlumni, getAlumniBySchool, deleteAlumniBySchool, updateAlumniBySchool} from '../controllers/alumni-controllers.js';
const router = express.Router();

// Schools
router.post('/schools/', ensureAuthenticated, addSchool);
router.get('/schools/:status', getSchoolsByStatus);
router.get('/schools/:id', getSchoolById);
router.put('/schools/:id', ensureAuthenticated, updateSchoolInfo);
router.delete('/schools/:id', ensureAuthenticated, deleteSchool);

// Amenities
router.post('/schools/amenities/', ensureAuthenticated, addAmenities);
router.get('/schools/amenities/:id', getAmenitiesById);
router.put('/schools/amenities/:id', ensureAuthenticated, updateAmenities);

// Activities
router.post('/schools/activities/', ensureAuthenticated, addActivities);
router.get('/schools/activities/:id', getActivitiesById);
router.put('/schools/activities/:id', ensureAuthenticated, updateActivities);

//Alumni
router.post("/alumnus", ensureAuthenticated, addAlumni);
router.get("/alumnus/:id", getAlumniBySchool);
router.put("/alumnus/:id", ensureAuthenticated, updateAlumniBySchool);
router.delete("/alumnus/:id", ensureAuthenticated, deleteAlumniBySchool);

export default router;