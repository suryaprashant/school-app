import express from "express";
import {
  getFormsByStudent,
  getFormsBySchool,
  trackForm,
  getFormDetails,
  submitForm,
  submitBulkForms,
  updateFormStatus,
  deleteForm
} from "../controllers/forms-controllers.js";

import ensureAuthenticated from "../middlewares/validate-token-middleware.js";

const router = express.Router();

router.get("/student/:studId", ensureAuthenticated, getFormsByStudent);

router.get("/school/:schoolId", ensureAuthenticated, getFormsBySchool);

router.get("/track/:formId", ensureAuthenticated, trackForm);

router.get("/:formId", ensureAuthenticated, getFormDetails);

router.post("/:schoolId/:studId", ensureAuthenticated, submitForm);

router.post("/bulk/:studId", ensureAuthenticated, submitBulkForms);

router.put("/:formId", ensureAuthenticated, updateFormStatus);

router.delete("/:formId", ensureAuthenticated, deleteForm);

export default router;
