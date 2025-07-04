import express from "express";
//import ensureAuthenticated from "../middlewares/validate-token-middleware.js";
import {addSchool, getSchoolById, updateSchoolInfo, deleteSchool} from '../controllers/school-controllers.js';
import {addAmenities, getAmenitiesById, updateAmenities} from '../controllers/amenities-controllers.js';
import {addActivities, getActivitiesById, updateActivities} from '../controllers/activities-controllers.js';
const router = express.Router();

// Schools
router.post('/schools/', addSchool);
//router.get('/schools/');
router.get('/schools/:id', getSchoolById);
router.put('/schools/:id', updateSchoolInfo);
router.delete('/schools/:id', deleteSchool);

// Amenities
router.post('/schools/amenities/', addAmenities);
router.get('/schools/amenities/:id', getAmenitiesById);
//router.put('/schools/amenities/:id', updateAmenities);

// Activities
router.post('/schools/activities/', addActivities);
router.get('/schools/activities/:id', getActivitiesById);
router.put('/schools/activities/:id', updateActivities);

// //Alumnus
// router.post('/alumnus');
// router.get('/alumnus/:id');
// router.put('/alumnus/:id');

export default router;