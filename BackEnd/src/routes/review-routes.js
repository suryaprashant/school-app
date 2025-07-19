import express from "express";
import ensureAuthenticated from '../middlewares/validate-token-middleware.js';
import {
  addReview,
  updateReview,
  getReviewsBySchool,
  getReviewsByStudent,
  likeReview
} from "../controllers/reviews-controllers.js";

const router = express.Router();

router.post("/", ensureAuthenticated, addReview);
router.put("/:schoolId/:studentId", ensureAuthenticated, updateReview);
router.get("/admin/:schoolId", getReviewsBySchool);
router.get("/users/:studentId", getReviewsByStudent);
router.patch("/like/:studentId/:reviewId", ensureAuthenticated, likeReview);

export default router;