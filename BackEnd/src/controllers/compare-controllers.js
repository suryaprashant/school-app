import { compareSchoolsService } from "../services/compare-services.js";

export const compareSchools = async (req, res) => {
  try {
    const { schoolId1, schoolId2 } = req.body;

    if (!schoolId1 || !schoolId2) {
      return res.status(400).json({ status: "failed", message: "Both schoolId1 and schoolId2 are required" });
    }

    const comparison = await compareSchoolsService(schoolId1, schoolId2);

    res.status(200).json({ status: "success", data: comparison });
  } catch (err) {
    res.status(err.status||500).json({ status: "failed", message: err.message });
  }
};
