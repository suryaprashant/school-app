import School from '../models/school-model.js';
import { parseFeeRange } from '../utils/fee-parsing.js';

export const getSchoolsByFeeRange = async (feeRange) => {
  const { min, max } = parseFeeRange(feeRange);

  const allSchools = await School.find(); 

  
  const matched = allSchools.filter(school => {
  const schoolRange = parseFeeRange(school.feeRange);
  if (!schoolRange) return false;
  return schoolRange.min >= min && schoolRange.max <= max;
});


  return matched;
};


export const getSchoolsByShift = async (shifts) => {
  return await School.find({ shifts });
};
