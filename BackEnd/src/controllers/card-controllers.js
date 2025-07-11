import { getSchoolCardDataService } from "../services/card-services.js";

export const getSchoolCardData = async (req, res) => {
  try {
    const { id: schoolId } = req.params;

    const data = await getSchoolCardDataService(schoolId);

    res.status(200).json({
      status: "success",
      message: "School card data fetched successfully",
      data
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message
    });
  }
};
