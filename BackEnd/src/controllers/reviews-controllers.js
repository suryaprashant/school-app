import {
   addReviewService,
  updateReviewService,
  getReviewsBySchoolService,
  getReviewsByStudentService,
  likeReviewService,
  acceptReviewService, // new
  rejectReviewService, // new
  getPendingReviewsService // new
} from "../services/reviews-services.js";

// POST /
export const addReview = async (req, res) => {
  try {
    const data = await addReviewService(req.body);
    res.status(201).json({ status: "success", message: "Review added successfully", data });
  } catch (err) {
    res.status(err.status || 500).json({ status: "failed", message: err.message });
  }
};

// PUT /:schoolId/:studentId
export const updateReview = async (req, res) => {
  try {
    const { studentId, schoolId } = req.params;
    const updates = req.body;

    const data = await updateReviewService(studentId, schoolId, updates);
    res.status(200).json({ status: "success", message: "Review updated successfully", data });
  } catch (err) {
    res.status(err.status || 500).json({ status: "failed", message: err.message });
  }
};

// GET /school/:schoolId
export const getReviewsBySchool = async (req, res) => {
  try {
    const { schoolId } = req.params;

    const data = await getReviewsBySchoolService(schoolId);
    res.status(200).json({ status: "success", message: "Reviews fetched successfully", data });
  } catch (err) {
    res.status(err.status || 500).json({ status: "failed", message: err.message });
  }
};

// GET /student/:studentId
export const getReviewsByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    const data = await getReviewsByStudentService(studentId);
    res.status(200).json({ status: "success", message: "Reviews fetched successfully", data });
  } catch (err) {
    res.status(err.status || 500).json({ status: "failed", message: err.message });
  }
};

// PATCH /like/:reviewId
export const likeReview = async (req, res) => {
  try {
    const { reviewId, studentId } = req.params;

    const data = await likeReviewService(reviewId, studentId);
    res.status(200).json({ status: "success", message: "Review liked successfully", data });
  } catch (err) {
    res.status(err.status || 500).json({ status: "failed", message: err.message });
  }
};


export const acceptReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const data = await acceptReviewService(reviewId);
    res.status(200).json({ status: "success", message: "Review accepted successfully", data });
  } catch (err) {
    res.status(err.status || 500).json({ status: "failed", message: err.message });
  }
};

// DELETE /reject/:reviewId
export const rejectReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const data = await rejectReviewService(reviewId);
    res.status(200).json({ status: "success", data });
  } catch (err) {
    res.status(err.status || 500).json({ status: "failed", message: err.message });
  }
};

// GET /pending
export const getPendingReviews = async (req, res) => {
  try {
    const data = await getPendingReviewsService();
    res.status(200).json({ status: "success", message: "Pending reviews fetched successfully", data });
  } catch (err) {
    res.status(err.status || 500).json({ status: "failed", message: err.message });
  }
};