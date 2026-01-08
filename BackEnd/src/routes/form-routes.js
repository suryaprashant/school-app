import express from "express";
import {
  getFormsByStudent,
  getFormsBySchool,
  trackForm,
  getFormDetails,
  submitForm,
  submitBulkForms,
  updateFormStatus,
  deleteForm,
  isFormApplied,
} from "../controllers/forms-controllers.js";

import ensureAuthenticated from "../middlewares/validate-token-middleware.js";

const router = express.Router();

router.get("/student/:studId", getFormsByStudent);

router.get("/school/:schoolId", getFormsBySchool);

router.get("/track/:formId", trackForm);

router.get("/is-applied/:studId/:schoolId", isFormApplied);

router.get("/:formId", ensureAuthenticated, getFormDetails);

router.post("/bulk-forms/:studId/:formId", submitBulkForms);

router.post("/:schoolId/:studId/:formId", submitForm);

router.put("/:formId", updateFormStatus);

router.delete("/:formId", ensureAuthenticated, deleteForm);

export default router;
