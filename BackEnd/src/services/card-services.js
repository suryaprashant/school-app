import School from "../models/school-model.js";

export const getSchoolCardDataService = async (schoolId) => {
  const school = await School.findById(schoolId);

  if (!school) {
    throw new Error("School not found");
  }

  const cardData = {
    name: school.name,
    feeRange: school.feeRange,
    location: `${school.city},${school.state}`,
    board: school.board,
    genderType: school.genderType,
    shifts: school.shifts,
    schoolMode:school.schoolMode
  };

  return cardData;
};
