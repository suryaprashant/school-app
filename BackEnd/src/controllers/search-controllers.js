import {searchSchoolsService} from '../services/search-services.js';

export const searchSchool = async (req, res) => {

  try {
    let { search, boards, cities, state, page = 1, limit = 10 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const result = await searchSchoolsService({ search, boards, cities, state, page, limit });

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