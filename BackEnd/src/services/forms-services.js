import Form from "../models/form-model.js";
import Student from "../models/user-model.js";
import School from "../models/school-model.js";
import { createNotificationService } from "./notification-services.js";

export const getFormsByStudentService = async (studId, status) => {
  const query = { studId };
  if (status) query.status = status;
  const forms = await Form.find(query).populate({ path: 'applicationForm', select: 'pdfFile' }).populate({ path: 'schoolId', select: 'name' }).populate({ path: 'schoolId', select: 'name schoolMode genderType shifts state city' }).populate({ path: 'studId', select: 'name' }).sort({createdAt: -1});
  return forms;
};

export const getFormsBySchoolService = async (schoolId, status) => {
  const query = { schoolId };
  if (status) query.status = status;
  const forms = await Form.find(query).populate({ path: 'applicationForm', select: 'pdfFile' }).populate({ path: 'studId', select: 'name email' });
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
  const form = await Form.findById(formId).populate({ path: 'applicationForm', select: 'pdfFile' }).populate({ path: 'schoolId', select: 'name schoolMode genderType shifts state city' }).populate({ path: 'studId', select: 'name email contactNo dateOfBirth gender' });
  if (!form) throw { status: 404, message: "Form not found" };
  return form;
};

export const submitFormService = async (formId, schoolId, studId) => {
  const student = await Student.findById(studId);
  const school = await School.findById(schoolId);

  const exisitingForm = await Form.findOne({ applicationForm: formId, schoolId, studId });
  if (exisitingForm) throw { status: 409, message: "Form already submitted to this school" };
  if (!student) throw { status: 404, message: "Student not found" };
  if (!school) throw { status: 404, message: "School not found" };

  const form = await Form.create({ applicationForm: formId, schoolId, studId });
  await createNotificationService({ title: `Form Submitted`, body: `You have successfully submitted a form to ${school.name}`, authId: student.authId, notificationType: 'Submitted' });
  return form;
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

export const updateFormStatusService = async (formId, status, note) => {
  
  // 2. CREATE A DYNAMIC UPDATE OBJECT
  const updateData = { status };
  // Only add the note if the status is 'Call for Interview'
  if (status === 'Interview' && note) {
    updateData.interviewNote = note;
  }

  const form = await Form.findByIdAndUpdate(
    formId,
    updateData, // Use the dynamic update object
    { new: true }
  );
  if (!form) throw { status: 404, message: "Form not found" };

  const student = await Student.findById(form.studId);
  if (!student) throw { status: 404, message: "Student not found for this form" };

  const school = await School.findById(form.schoolId);
  if (!school) throw { status: 404, message: "School not found for this form" };
  
  // 3. ADD A NEW CASE for the interview notification
  switch (status) {
    case 'Accepted':
      await createNotificationService({ title: 'Application Accepted', body: `Your application to ${school.name} has been accepted`, authId: student.authId, notificationType: 'Accepted' });
      break;
    case 'Rejected':
      await createNotificationService({ title: 'Application Rejected', body: `Your application to ${school.name} has been rejected`, authId: student.authId, notificationType: 'Rejected' });
      break;
    case 'Reviewed':
      await createNotificationService({ title: 'Application Under Review', body: `Your application to ${school.name} is under review`, authId: student.authId, notificationType: 'Reviewed' });
      break;
    // ADD THIS NEW CASE
    case 'Interview':
      await createNotificationService({ 
          title: 'Interview Invitation', 
          body: `You've been invited for an interview at ${school.name}. Note: "${note}"`, 
          authId: student.authId, 
          notificationType: 'Interview' 
      });
      break;
    default:
      break;
  }

  return form;
};
export const deleteFormService = async (formId) => {
  const result = await Form.findByIdAndDelete(formId);
  if (!result) throw { status: 404, message: "Form not found" };
  return result;
};

export const getIsFormApplied = async (studId, schoolId) => {
  const form = await Form.findOne({ studId, schoolId });
  if(!form) throw { status: 404, message: "No form application found for this student and school" };
  return { isApplied: true, formId: form._id, status: form.status };
}