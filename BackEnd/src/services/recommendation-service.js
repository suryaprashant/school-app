import School from "../models/school-model.js";

/**
 * Get recommended schools based on user preferences
 * @param {Object} preferences - User preferences object
 * @returns {Promise<Array>} - Array of recommended schools
 */
export const getRecommendedSchools = async (preferences) => {
  try {
    const { state, city, schoolType, preferredStandard, feeRange, shift, interests } = preferences;
    
    // Build the query based on available preferences
    const query = {
      state: state,
      city: city,
      schoolMode: schoolType,
      shifts: shift,
      // Add more conditions based on your matching criteria
    };

    // Add fee range filter if available
    if (feeRange && feeRange.length === 2) {
      const [minFee, maxFee] = feeRange;
      query['feeRange'] = { $gte: minFee, $lte: maxFee };
    }

    // Find matching schools
    const schools = await School.find(query);

    // You can add more sophisticated ranking/scoring logic here
    // For example, give higher scores to schools that match more criteria
    
    return schools;
  } catch (error) {
    console.error('Error in getRecommendedSchools:', error);
    throw error;
  }
};
