import Form from "../models/form-model.js";

export const getFormsByStudentService = async (studId, status) => {
  const query = { studId };
  if (status) query.status = status;
  const forms = await Form.find(query).populate({path: 'applicationForm', select: 'pdfFile'}).populate({path: 'schoolId', select: 'name'});
  return forms;
};

export const getFormsBySchoolService = async (schoolId, status) => {
  const query = { schoolId };
  if (status) query.status = status;
  const forms = await Form.find(query).populate({path: 'applicationForm', select: 'pdfFile'}).populate({path: 'studId', select: 'name email'});
  return forms;
  return forms;
};

export const trackFormService = async (formId) => {
  const form = await Form.findById(formId).populate({
      path: "schoolId",
      select: "name"
    }).populate({
      path: "studId",
      select: "pdfFile",
    });
  if (!form) throw { status: 404, message: "Form not found" };

  return form;
};

export const getFormDetailsService = async (formId) => {
  const form = await Form.findById(formId).populate({path: 'applicationForm', select: 'pdfFile'});
  if (!form) throw { status: 404, message: "Form not found" };
  return form;
};

export const submitFormService = async (formId, schoolId, studId) => {
  return await Form.create({ applicationForm: formId, schoolId, studId });
};

export const submitBulkFormsService = async (studId, forms, formId) => {

  if (!Array.isArray(forms) || forms.length === 0) {
    throw { status: 400, message: "Forms must be a non-empty array" };
  }

  const submittedForms = [];
  for (const form of forms) {
    submittedForms.push(await Form.create({ applicationForm: formId, schoolId: form, studId }));
  }

  return submittedForms;
};

export const updateFormStatusService = async (formId, status) => {
  const form = await Form.findByIdAndUpdate(
    formId,
    { status },
    { new: true }
  );
  if (!form) throw { status: 404, message: "Form not found" };
  return form;
};

export const deleteFormService = async (formId) => {
  const result = await Form.findByIdAndDelete(formId);
  if (!result) throw { status: 404, message: "Form not found" };
  return result;
};
