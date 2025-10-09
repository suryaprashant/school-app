import express from "express";
import {
  addSchool, getSchoolById, getSchoolsByStatus, updateSchoolInfo, deleteSchool,
  uploadSchoolPhotos, uploadSchoolVideo, deleteSchoolPhoto, deleteSchoolVideo,
  getSchoolPhoto, getSchoolVideos, getSchoolPhotos, getSchoolVideo
} from '../controllers/school-controllers.js';

import { addAmenities, getAmenitiesById, updateAmenities } from '../controllers/amenities-controllers.js';
import { addActivities, getActivitiesById, updateActivities } from '../controllers/activities-controllers.js';
import { addAlumni, getAlumniBySchool, deleteAlumniBySchool, updateAlumniBySchool } from '../controllers/alumni-controllers.js';
import { searchSchool } from '../controllers/search-controllers.js';
import { compareSchools } from "../controllers/compare-controllers.js";
import { getSchoolByFeeRange, getSchoolByShift } from '../controllers/filter-controllers.js';
import { getSchoolCardData } from "../controllers/card-controllers.js";
import { addInfrastructure, getInfrastructureById, updateInfrastructure } from '../controllers/infrastructure-controllers.js';
import { addOtherDetails, getOtherDetailsById, updateOtherDetails } from '../controllers/other-detail-controller.js';
import { addFeesAndScholarships, getFeesAndScholarshipsById, updateFeesAndScholarships } from '../controllers/fees-scholarship-controllers.js';
import { addAcademics, getAcademicsById, updateAcademics } from '../controllers/academic-controllers.js';
import { addSupport, getSupportByStudId, getSupportBySupId, deleteSupportBySupId } from '../controllers/support-controllers.js';
import { predictSchools } from "../controllers/predictor-controllers.js";
import { createBlog, getAllBlogs, getBlogById } from "../controllers/blog-controllers.js";
import { photoUpload, videoUpload } from '../../config/multer.js';
import { addTechnologyAdoption, getTechnologyAdoptionById, updateTechnologyAdoption } from '../controllers/technology-adoption-controllers.js';
import { addAdmissionDetails, getAdmissionDetails, updateAdmissionDetails, deleteAdmissionDetails } from '../controllers/admission-controllers.js';
import { addAdmissionStatus, getAdmissionStatusByStudent, updateAdmissionStatus, deleteAdmissionStatus } from "../controllers/admission-status-controller.js";

import { filterSchoolsByPreferences } from '../controllers/school-controllers.js';
import ensureAuthenticated from '../middlewares/validate-token-middleware.js';
import { updateSchoolStatus } from '../controllers/admin-controller.js';
import { protectAdmin } from '../middlewares/adminAuth-middleware.js';
import { getPendingSchools } from '../controllers/admin-controller.js';

const router = express.Router();

// ===== ADMIN ROUTES =====
// Admin routes MUST come before dynamic :id routes to avoid conflicts
router.get('/admin/pending', protectAdmin, getPendingSchools); // fetch all pending schools
router.get('/admin/status/:status', protectAdmin, getSchoolsByStatus); // fetch schools by status
router.patch('/admin/:id/status', ensureAuthenticated, protectAdmin, updateSchoolStatus);

// ===== REGULAR SCHOOL ROUTES =====
router.get('/status/:status', getSchoolsByStatus);
router.get('/:id', getSchoolById);
router.delete('/:id', deleteSchool);


router.post('/:id/upload/photos', photoUpload.array('files', 4), uploadSchoolPhotos);
router.post('/:id/upload/video', videoUpload.single('file'), uploadSchoolVideo);
router.delete('/:id/photo/:publicId', deleteSchoolPhoto);
router.delete('/:id/video/:publicId', deleteSchoolVideo);

router.get('/:id/photos', getSchoolPhotos);
router.get('/:id/videos', getSchoolVideos);
router.get('/:id/photo/:publicId', getSchoolPhoto);
router.get('/:id/video/:publicId', getSchoolVideo);

// Amenities
router.post('/schools/amenities/', addAmenities);
router.get('/schools/amenities/:id', getAmenitiesById);
router.put('/schools/amenities/:id', updateAmenities);

// Activities
router.post('/schools/activities/', addActivities);
router.get('/schools/activities/:id', getActivitiesById);
router.put('/schools/activities/:id', updateActivities);

// Alumni
router.post("/alumnus", ensureAuthenticated, addAlumni);
router.get("/alumnus/:id", getAlumniBySchool);
router.put("/alumnus/:id", ensureAuthenticated, updateAlumniBySchool);
router.delete("/alumnus/:id", ensureAuthenticated, deleteAlumniBySchool);

// Infrastructure
router.post('/schools/infrastructure/', addInfrastructure);
router.get('/schools/infrastructure/:id', getInfrastructureById);
router.put('/schools/infrastructure/:id', updateInfrastructure);

// Other details
router.post('/schools/other-details/', addOtherDetails);
router.get('/schools/other-details/:id', getOtherDetailsById);
router.put('/schools/other-details/:id', updateOtherDetails);

// Academics
router.post('/schools/academics/', addAcademics);
router.get('/schools/academics/:id', getAcademicsById);
router.put('/schools/academics/:id', updateAcademics);

// Fees & Scholarships
router.post('/schools/fees-scholarships/', addFeesAndScholarships);
router.get('/schools/fees-scholarships/:id', getFeesAndScholarshipsById);
router.put('/schools/fees-scholarships/:id', updateFeesAndScholarships);

// Technology & Adoption
router.post('/schools/technology-adoption/', addTechnologyAdoption);
router.get('/schools/technology-adoption/:id', getTechnologyAdoptionById);
router.put('/schools/technology-adoption/:id', updateTechnologyAdoption);

// Searching, compare & filters
router.get("/search", searchSchool);
router.post("/compare", compareSchools);
router.get('/filter-feeRange', getSchoolByFeeRange);
router.get('/filter-Shift', getSchoolByShift);
router.get("/card/:id", getSchoolCardData);

// Support
router.post('/support', ensureAuthenticated, addSupport);
router.get('/support/:studId', getSupportByStudId);
router.get('/support-id/:supportId', getSupportBySupId);  
router.delete('/support/:supportId', ensureAuthenticated, deleteSupportBySupId);

// Predictor
router.post('/predict-schools', predictSchools);

// Blogs
router.post("/blogs", createBlog);
router.get("/blogs", getAllBlogs);
router.get("/blogs/:id", getBlogById);

// Admission Details
router.post('/schools/admission/:id', ensureAuthenticated, addAdmissionDetails);
router.get('/schools/admission/:id', getAdmissionDetails);
router.put('/schools/admission/:id', ensureAuthenticated, updateAdmissionDetails);
router.delete('/schools/admission/:id', ensureAuthenticated, deleteAdmissionDetails);

// Admission Status
router.post('/schools/admission-status', ensureAuthenticated, addAdmissionStatus);
router.get('/schools/admission-status/:studentId', getAdmissionStatusByStudent);
router.put('/schools/admission-status/:studentId/:schoolId', ensureAuthenticated, updateAdmissionStatus);
router.delete('/schools/admission-status/:studentId/:schoolId', ensureAuthenticated, deleteAdmissionStatus);

// Preferences
router.get('/filter/:studentId', ensureAuthenticated, filterSchoolsByPreferences);

export default router;
