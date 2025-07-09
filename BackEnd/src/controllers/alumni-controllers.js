import {
  addAlumniService,
  getAlumniBySchoolService,
  updateAlumniBySchoolService,
  deleteAlumniBySchoolService,
} from "../services/alumni-services.js";

// POST /alumni
export const addAlumni = async (req, res) => {
  try {
    const data = await addAlumniService(req.body);
    res.status(201).json({
      status: "success",
      message: "Alumni added successfully",
      data,
    });
  } catch (err) {
    res.status(err.status||500).json({ status: "failed", message: err.message });
  }
};

// GET /alumni/:id
export const getAlumniBySchool = async (req, res) => {
  try {
    const { id: schoolId } = req.params;
    const data = await getAlumniBySchoolService(schoolId);
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(err.status||500).json({ status: "failed", message: err.message });
  }
};

// PUT /alumni/:id
export const updateAlumniBySchool = async (req, res) => {
  try {
    const { id: schoolId } = req.params;
    const updates = req.body;

    const data = await updateAlumniBySchoolService(schoolId, updates);

    res.status(200).json({
      status: "success",
      message: "Alumni data updated successfully",
      data,
    });
  } catch (err) {
    res.status(err.status||500).json({ status: "failed", message: err.message });
  }
};

// DELETE /alumni/:id
export const deleteAlumniBySchool = async (req, res) => {
  try {
    const { id: schoolId } = req.params;

    await deleteAlumniBySchoolService(schoolId);

    res.status(200).json({
      status: "success",
      message: "Alumni data deleted successfully",
    });
  } catch (err) {
    res.status(err.status||500).json({ status: "failed", message: err.message });
  }
};
