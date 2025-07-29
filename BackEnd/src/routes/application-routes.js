import express from 'express';
import {
  addStudApplication,
  getAllStudApplication,
  getStudApplicationById,
  updateStudApplication,
  deleteStudApplication
} from '../controllers/application-controllers.js';

const router = express.Router();

router.post('/', addStudApplication);
router.get('/', getAllStudApplication);
router.get('/:studId', getStudApplicationById);
router.put('/:studId', updateStudApplication);
router.delete('/:studId', deleteStudApplication);

export default router;
