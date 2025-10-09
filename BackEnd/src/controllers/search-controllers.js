import {searchSchoolsService} from '../services/search-services.js';

export const searchSchool = async (req, res) => {

  try {
    // Accept aliases from frontend (singular/plural/snake_case)
    const q = req.query;
    let search = q.search;
    let boards = q.boards || q.board;
    let cities = q.cities || q.city;
    let state = q.states || q.state;
    let schoolMode = q.schoolMode || q.school_mode || q.mode;
    let genderType = q.genderType || q.gender;
    let feeRange = q.feeRange || q.fee_range;
    let page = q.page ?? 1;
    let limit = q.limit ?? 10;

    page = parseInt(page);
    limit = parseInt(limit);

    const result = await searchSchoolsService({ search, boards, cities, state,schoolMode, genderType, feeRange, page, limit });

    if (!result.data.length) {
      return res.status(404).json({ status: "failed", message: "No schools found for the given search." });
    }

    res.status(200).json({
      status: "success",
      message: "Schools found for your search",
      data: result.data,
      pagination: result.pagination
    });

  } catch (error) {
    res.status(error.status || 500).json({ status: "failed", message: error.message || "Internal Server Error" });
  }
  
};