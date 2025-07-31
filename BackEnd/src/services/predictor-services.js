import School from '../models/school-model.js';
import Activities from '../models/activities-model.js';
import { parseFeeRange,parseClassLevel } from '../utils/fee-parsing.js';

export const predictSchoolsService = async (filters) => {
  const {
    board,
    state,
    city,
    schoolMode,
    genderType,
    shifts = [],
    feeRange,
    upto,
    specialist = [], //Optional
    languageMedium = [],
    transportAvailable,
    activities = []
  } = filters;

  const query = {
    status: 'accepted',
    ...(board && { board }),
    ...(state && { state }),
    ...(city && { city }),
    ...(schoolMode && { schoolMode }),
    ...(genderType && { genderType }),
    ...(shifts.length > 0 && { shifts: { $in: shifts } }),
    ...(specialist.length > 0 && { specialist: { $in: specialist } }),
    ...(languageMedium.length > 0 && { languageMedium: { $in: languageMedium } }),
    ...(transportAvailable && { transportAvailable })
  };

  let matchedSchools = await School.find(query);
  if (upto) {
  const userClassLevel = parseClassLevel(upto);

  matchedSchools = matchedSchools.filter((school) => {
    const schoolClassLevel = parseClassLevel(school.upto);
    return schoolClassLevel && schoolClassLevel >= userClassLevel;
  });
}


  if (feeRange) {
  const userRange = parseFeeRange(feeRange);
 
  matchedSchools = matchedSchools.filter((school) => {
    const schoolRange = parseFeeRange(school.feeRange);
   
    if (!schoolRange) return false;
    return (
      schoolRange.max >= userRange.min && schoolRange.min <= userRange.max
    );
  });
}


  if (activities.length > 0) {
    const activityDocs = await Activities.find({
      activities: { $in: activities },
      schoolId: { $in: matchedSchools.map((s) => s._id) },
    });

     const schoolIdsWithActivities = activityDocs.map((a) =>
      a.schoolId.toString()
    );

    matchedSchools = matchedSchools.filter((s) =>
      schoolIdsWithActivities.includes(s._id.toString())
    );
  }

  return matchedSchools;
};