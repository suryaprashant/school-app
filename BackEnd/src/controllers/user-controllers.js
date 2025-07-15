import {
  addStudentService,
  updateStudentService,
  deleteStudentService,
  getStudentService,
} from "../services/user-services.js";

// POST /add
export const addStudent = async (req, res) => {
  try {
    const data = await addStudentService(req.body);
    res.status(201).json({
      status: "success",
      message: "Student added successfully",
      data,
    });
  } catch (err) {
    res.status(err.status||500).json({ status: "failed", message: err.message });
  }
};

// PUT /update/:authId
export const updateStudent = async (req, res) => {
  try {
    const { authId } = req.params;
    const updates = req.body;

    const data = await updateStudentService(authId, updates);

    res.status(200).json({
      status: "success",
      message: "Student updated successfully",
      data: { student: data },
    });
  } catch (err) {
    res.status(err.status||500).json({ status: "failed", message: err.message });
  }
};

// DELETE /delete/:authId
export const deleteStudent = async (req, res) => {
  try {
    const { authId } = req.params;

    await deleteStudentService(authId);

    res.status(200).json({
      status: "success",
      message: "Student deleted successfully",
    });
  } catch (err) {
    res.status(err.status||500).json({ status: "failed", message: err.message });
  }
};

// GET /:authId
export const getStudent = async (req, res) => {
  try {
    const { authId } = req.params;

    const data = await getStudentService(authId);

    res.status(200).json({
      status: "success",
      message: "Student fetched successfully",
      data,
    });
  } catch (err) {
    res.status(err.status||500).json({ status: "failed", message: err.message });
  }
};
