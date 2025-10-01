import express from "express";
import ensureAuthenticated from '../middlewares/validate-token-middleware.js';
import {
  addReview,
  updateReview,
  getReviewsBySchool,
  getReviewsByStudent,
  likeReview,
  getPendingReviews,
  acceptReview,
  rejectReview
} from "../controllers/reviews-controllers.js";

const router = express.Router();

router.post("/",  addReview);
router.put("/:schoolId/:studentId",updateReview);
router.get("/users/:studentId", getReviewsByStudent);
router.patch("/like/:studentId/:reviewId", likeReview);

// This route now only fetches ACCEPTED reviews for the given school, as per the service logic.

router.get("/admin/:schoolId", getReviewsBySchool);


// Get all reviews with 'Pending' status
router.get("/admin/pending/all", getPendingReviews);

// Change a review's status to 'Accepted'
router.patch("/admin/accept/:reviewId", acceptReview);

// Delete a review (i.e., Reject it)
router.delete("/admin/reject/:reviewId", rejectReview);


export default router;