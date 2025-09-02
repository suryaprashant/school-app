import express from 'express';
import chatbotController from '../controllers/chatbot-controllers.js';

const router = express.Router();

// Get all predefined questions
router.get('/questions', chatbotController.getQuestions);

// Get questions by category
router.get('/questions/category/:category', chatbotController.getQuestionsByCategory);

// Filter schools by question
router.get('/filter/question/:questionId', chatbotController.filterByQuestion);

// Filter schools with multiple criteria
router.post('/filter', chatbotController.filterWithMultipleCriteria);

// Search schools by name
router.get('/search', chatbotController.searchSchools);

export default router;