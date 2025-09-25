import School from "../models/school-model.js";

export const searchSchoolsService = async ({ search, boards, cities, state,schoolMode, genderType, feeRange, page, limit }) => {
  const boardArrays = boards ? (Array.isArray(boards) ? boards : boards.split(",")) : [];
  const stateArray = state ? (Array.isArray(state) ? state : state.split(",")) : [];
  const cityArray = cities ? (Array.isArray(cities) ? cities : cities.split(",")) : [];
const modeArray = schoolMode ? (Array.isArray(schoolMode) ? schoolMode : schoolMode.split(",")).map(m => m.toLowerCase()) : [];
const genderArray = genderType ? (Array.isArray(genderType) ? genderType : genderType.split(",")).map(g => g.toLowerCase()) : [];
const feeArray = feeRange ? (Array.isArray(feeRange) ? feeRange : feeRange.split(",")) : [];



  const validBoards = [
    'CBSE','ICSE','CISCE','NIOS','SSC','IGCSE','IB','KVS','JNV','DBSE','MSBSHSE','UPMSP','KSEEB',
    'WBBSE','GSEB','RBSE','BSEB','PSEB','BSE','SEBA','MPBSE','STATE','OTHER'
  ];

  const invalidBoards = boardArrays.filter(s => !validBoards.includes(s));
  if (invalidBoards.length > 0) {
    throw { status: 400, message: `Invalid stream(s): ${invalidBoards.join(", ")}. Allowed: ${validBoards.join(", ")}` };
  }

  let query = {};
  if (search && search.trim() !== "") {
    query.name = { $regex: new RegExp(search, "i") };
  }
  if (boardArrays.length > 0) query.board = { $in: boardArrays };
  if (cityArray.length > 0) query.city = { $in: cityArray };
  if (stateArray.length > 0) query.state = { $in: stateArray };
if (modeArray.length > 0) query.schoolMode = { $in: modeArray };
if (genderArray.length > 0) query.genderType = { $in: genderArray };
if (feeArray.length > 0) query.feeRange = { $in: feeArray };

  const skip = (page - 1) * limit;

  const schools = await School.find(query).skip(skip).limit(limit);
  const total = await School.countDocuments(query);

  let sorted = schools;
  if (search && search.trim() !== "") {
    const searchLower = search.toLowerCase();
    sorted = schools.sort((a, b) => {
      const aName = (a.name || "").toLowerCase();
      const bName = (b.name || "").toLowerCase();
      if (aName.startsWith(searchLower)) return -1;
      if (bName.startsWith(searchLower)) return 1;
      return 0;
    });
  }

  return {
    data: sorted,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
};