// src/routes/openai.routes.js
import express from 'express';
import { askOpenAI } from '../controllers/ai-controllers.js';

const router = express.Router();

router.post('/ask', askOpenAI);

export default router;
