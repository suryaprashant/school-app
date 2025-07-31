import Form from "../models/form-model.js";

export const getFormsByStudentService = async (studId, status) => {
  const query = { studId };
  if (status) query.status = status;
  return await Form.find(query);
};

export const getFormsBySchoolService = async (schoolId, status) => {
  const query = { schoolId };
  if (status) query.status = status;
  return await Form.find(query);
};

export const trackFormService = async (formId) => {
  const form = await Form.findById(formId).populate({
      path: "schoolId",
      select: "name"
    });
  if (!form) throw { status: 404, message: "Form not found" };

  return form;
};

export const getFormDetailsService = async (formId) => {
  const form = await Form.findById(formId);
  if (!form) throw { status: 404, message: "Form not found" };
  return form;
};

export const submitFormService = async (schoolId, studId, formData) => {
  return await Form.create({ ...formData, schoolId, studId });
}; //------------------>

export const submitBulkFormsService = async (studId, forms) => {
  const bulkForms = forms.map(form => ({ ...form, studId }));
  return await Form.insertMany(bulkForms);
}; //------------------>

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
