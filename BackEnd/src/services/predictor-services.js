import School from '../models/school-model.js';
import Activities from '../models/activities-model.js';
import { parseFeeRange, parseClassLevel } from '../utils/fee-parsing.js';

export const predictSchoolsService = async (filters) => {
  console.log('=== PREDICT SCHOOLS SERVICE STARTED ===');
  console.log('Received filters:', JSON.stringify(filters, null, 2));

  const {
    board,
    state,
    city,
    schoolMode,
    genderType,
    shifts = [],
    feeRange,
    upto,
    specialist = [],
    languageMedium = [],
    transportAvailable,
    activities = []
  } = filters;

  // Build OR query correctly
  const orConditions = [];
  
  // Add each filter as a separate OR condition
  if (board) orConditions.push({ board });
  if (state) orConditions.push({ state });
  if (city) orConditions.push({ city });
  if (schoolMode) orConditions.push({ schoolMode });
  if (genderType) orConditions.push({ genderType });
  if (shifts.length > 0) orConditions.push({ shifts: { $in: shifts } });
  if (specialist.length > 0) orConditions.push({ specialist: { $in: specialist } });
  if (languageMedium.length > 0) orConditions.push({ languageMedium: { $in: languageMedium } });
  if (transportAvailable !== undefined && transportAvailable !== null) {
    orConditions.push({ transportAvailable });
  }

  // Build the final query
  const query = {
    status: 'accepted'
  };

  // Only add $or if there are conditions
  if (orConditions.length > 0) {
    query.$or = orConditions;
  }

  console.log('MongoDB Query:', JSON.stringify(query, null, 2));

  try {
    let matchedSchools = await School.find(query);
    console.log('Schools found after OR query:', matchedSchools.length);
    
    if (matchedSchools.length > 0) {
      console.log('Sample schools from OR query:');
      matchedSchools.slice(0, 3).forEach((school, index) => {
        console.log(`School ${index + 1}:`, {
          name: school.name,
          board: school.board,
          feeRange: school.feeRange,
          schoolMode: school.schoolMode,
          genderType: school.genderType,
          matches: orConditions.map(cond => {
            const key = Object.keys(cond)[0];
            return { [key]: school[key] === cond[key] };
          })
        });
      });
    }

    // Additional filtering for class level (AND logic)
    if (upto) {
      const userClassLevel = parseClassLevel(upto);
      console.log('User class level:', userClassLevel);
      
      const initialCount = matchedSchools.length;
      matchedSchools = matchedSchools.filter((school) => {
        const schoolClassLevel = parseClassLevel(school.upto);
        const matches = schoolClassLevel && schoolClassLevel >= userClassLevel;
        return matches;
      });
      console.log(`Class filter: ${initialCount} -> ${matchedSchools.length} schools`);
    }

    // Additional filtering for fee range (AND logic)
    if (feeRange) {
      const userRange = parseFeeRange(feeRange);
      console.log('User fee range:', userRange);
      
      const initialCount = matchedSchools.length;
      matchedSchools = matchedSchools.filter((school) => {
        const schoolRange = parseFeeRange(school.feeRange);
        if (!schoolRange) return false;
        return schoolRange.max >= userRange.min && schoolRange.min <= userRange.max;
      });
      console.log(`Fee filter: ${initialCount} -> ${matchedSchools.length} schools`);
    }

    // Additional filtering for activities (AND logic)
    if (activities.length > 0) {
      console.log('Filtering by activities:', activities);
      
      const initialCount = matchedSchools.length;
      const activityDocs = await Activities.find({
        activities: { $in: activities },
        schoolId: { $in: matchedSchools.map((s) => s._id) },
      });

      const schoolIdsWithActivities = activityDocs.map((a) => a.schoolId.toString());
      console.log('School IDs with activities:', schoolIdsWithActivities);
      
      matchedSchools = matchedSchools.filter((s) =>
        schoolIdsWithActivities.includes(s._id.toString())
      );
      console.log(`Activities filter: ${initialCount} -> ${matchedSchools.length} schools`);
    }

    console.log('=== FINAL RESULT ===');
    console.log('Total matched schools:', matchedSchools.length);
    
    if (matchedSchools.length > 0) {
      matchedSchools.forEach((school, index) => {
        console.log(`School ${index + 1}:`, {
          name: school.name,
          board: school.board,
          feeRange: school.feeRange,
          schoolMode: school.schoolMode,
          genderType: school.genderType
        });
      });
    } else {
      console.log('NO SCHOOLS FOUND. Checking database...');
      
      // Debug: Check what schools exist
      const allSchools = await School.find({ status: 'accepted' }).limit(5);
      console.log('Sample schools in database:', allSchools.map(s => ({
        name: s.name,
        board: s.board,
        feeRange: s.feeRange,
        schoolMode: s.schoolMode,
        genderType: s.genderType
      })));
    }

    return matchedSchools;
  } catch (error) {
    console.error('Error in predictSchoolsService:', error);
    throw error;
  }
};