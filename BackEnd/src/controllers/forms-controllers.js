import {
  getFormsByStudentService,
  getFormsBySchoolService,
  trackFormService,
  getFormDetailsService,
  submitFormService,
  submitBulkFormsService,
  updateFormStatusService,
  deleteFormService
} from "../services/forms-services.js";

export const getFormsByStudent = async (req, res) => {
  try {
    const { studId } = req.params;
    const { status } = req.query;

    const data = await getFormsByStudentService(studId, status);
    res.status(200).json({ status: "success", message: "Forms fetched successfully", data });
  } catch (err) {
    res.status(err.status || 500).json({ status: "failed", message: err.message });
  }
};

export const getFormsBySchool = async (req, res) => {
  try {
    const { schoolId } = req.params;
    const { status } = req.query;

    const data = await getFormsBySchoolService(schoolId, status);
    res.status(200).json({ status: "success", message: "Forms fetched successfully", data });
  } catch (err) {
    res.status(err.status || 500).json({ status: "failed", message: err.message });
  }
};

export const trackForm = async (req, res) => {
  try {
    const { formId } = req.params;

    const data = await trackFormService(formId);
    res.status(200).json({ status: "success", message: "Form tracking info fetched", data });
  } catch (err) {
    res.status(err.status || 500).json({ status: "failed", message: err.message });
  }
};

export const getFormDetails = async (req, res) => {
  try {
    const { formId } = req.params;

    const data = await getFormDetailsService(formId);
    res.status(200).json({ status: "success", message: "Form details fetched", data });
  } catch (err) {
    res.status(err.status || 500).json({ status: "failed", message: err.message });
  }
};

export const submitForm = async (req, res) => {
  try {
    const { formId, schoolId, studId } = req.params;

    const data = await submitFormService(formId, schoolId, studId);
    res.status(201).json({ status: "success", message: "Form submitted successfully", data });
  } catch (err) {
    res.status(err.status || 500).json({ status: "failed", message: err.message });
  }
};

export const submitBulkForms = async (req, res) => {

  console.log(req.body)

  try {
    const { studId, formId } = req.params;
    const { forms } = req.body;

    const data = await submitBulkFormsService(studId, forms, formId);
    res.status(201).json({ status: "success", message: "Bulk forms submitted", data });
  } catch (err) {
    res.status(err.status || 500).json({ status: "failed", message: err.message });
  }
};

export const updateFormStatus = async (req, res) => {
  try {
    const { formId } = req.params;
    const { status } = req.query;

    const data = await updateFormStatusService(formId, status);
    res.status(200).json({ status: "success", message: "Form status updated", data });
  } catch (err) {
    res.status(err.status || 500).json({ status: "failed", message: err.message });
  }
};

export const deleteForm = async (req, res) => {
  try {
    const { formId } = req.params;

    const data = await deleteFormService(formId);
    res.status(200).json({ status: "success", message: "Form deleted successfully", data });
  } catch (err) {
    res.status(err.status || 500).json({ status: "failed", message: err.message });
  }
};
