import Review from "../models/reviews-model.js";
import Student from "../models/user-model.js";

// This service remains unchanged, new reviews will default to 'Pending'
export const addReviewService = async (data) => {
  const { studentId, schoolId, text, ratings } = data;

  const existing = await Review.findOne({ "student.studentId": studentId, schoolId });
  if (existing) {
    throw { status: 400, message: "Review already exists for this student and school" };
  }

  const student = await Student.findById(studentId);
  if (!student) {
    throw { status: 404, message: "Student not found" };
  }

  const reviewData = {
    schoolId,
    text,
    ratings,
    student: {
      studentId: student._id,
      name: student.name,
      email: student.email
    }
  };

  const newReview = new Review(reviewData);
  return await newReview.save();
};

export const updateReviewService = async (studentId, schoolId, updates) => {
  const updated = await Review.findOneAndUpdate(
    { "student.studentId": studentId, schoolId },
    updates,
    { new: true }
  );

  if (!updated) {
    throw { status: 400, message: "Review not found for this student and school" };
  }

  return updated;
};

// --- MODIFIED SERVICE ---
// Now only fetches ACCEPTED reviews for a school (for public view)
export const getReviewsBySchoolService = async (schoolId) => {
  const reviews = await Review.find({ schoolId, status: 'Accepted' }).sort({ createdAt: -1 });

  // It's better not to throw an error if no reviews are found, just return an empty array.
  // The frontend can handle the "No reviews yet" message.
  return reviews;
};

export const getReviewsByStudentService = async (studentId) => {
  const reviews = await Review.find({ "student.studentId": studentId }).sort({ createdAt: -1 });
  if (!reviews.length) {
    throw { status: 404, message: "No reviews found by this student" };
  }
  return reviews;
};

export const likeReviewService = async (reviewId, studentId) => {
  const review = await Review.findById(reviewId);
  if (!review) {
    throw { status: 404, message: "Review not found" };
  }

  if (review.likedBy.includes(studentId)) {
    throw { status: 400, message: "You have already liked this review" };
  }

  review.likes += 1;
  review.likedBy.push(studentId);
  return await review.save();
};

// --- NEW SERVICES FOR ADMIN PANEL ---

/**
 * Updates a review's status to 'Accepted'.
 */
export const acceptReviewService = async (reviewId) => {
  const review = await Review.findByIdAndUpdate(
    reviewId,
    { status: 'Accepted' },
    { new: true }
  );
  if (!review) {
    throw { status: 404, message: "Review not found" };
  }
  return review;
};

/**
 * Deletes a review from the database.
 */
export const rejectReviewService = async (reviewId) => {
  const review = await Review.findByIdAndDelete(reviewId);
  if (!review) {
    throw { status: 404, message: "Review not found" };
  }
  return { message: "Review rejected and deleted successfully" };
};

/**
 * Fetches all reviews with 'Pending' status.
 */
export const getPendingReviewsService = async () => {
  return await Review.find({ status: 'Pending' }).sort({ createdAt: 'asc' });
};