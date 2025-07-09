import {
  addToShortlistService,
  getShortlistedSchoolsService,
  removeShortlistService,
  getShortlistCountService,
} from "../services/shortlist-services.js";

// ✅ Add School to Shortlist
export const addToShortlist = async (req, res) => {
  try {
    const { authId, schoolId } = req.body;

    const data = await addToShortlistService({ authId, schoolId });

    res.status(200).json({
      status: "success",
      message: "School added to shortlist",
      data,
    });
  } catch (error) {
    res.status(error.status||500).json({ status: "failed", message: error.message });
  }
};

// ✅ Get Shortlisted Schools
export const getShortlistedSchools = async (req, res) => {
  try {
    const { authId } = req.params;

    const data = await getShortlistedSchoolsService(authId);

    res.status(200).json({
      status: "success",
      message: "Shortlisted schools retrieved",
      data,
    });
  } catch (error) {
    res.status(error.status||500).json({ status: "failed", message: error.message });
  }
};

// ✅ Remove School from Shortlist
export const removeShortlist = async (req, res) => {
  try {
    const { authId, schoolId } = req.body;

    const data = await removeShortlistService({ authId, schoolId });

    res.status(200).json({
      status: "success",
      message: "School removed from shortlist",
      data,
    });
  } catch (error) {
    res.status(error.status||500).json({ status: "failed", message: error.message });
  }
};

// ✅ Get Count of Shortlisted Schools
export const getShortlistCount = async (req, res) => {
  try {
    const { authId } = req.params;

    const data = await getShortlistCountService(authId);

    res.status(200).json({
      status: "success",
      message: "Shortlist count retrieved",
      data,
    });
  } catch (error) {
    res.status(error.status||500).json({ status: "failed", message: error.message });
  }
};
