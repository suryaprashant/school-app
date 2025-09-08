import ChatbotService from '../services/chatbot-services.js';

const chatbotService = new ChatbotService();

// Get all predefined questions
const getQuestions = async (req, res) => {
  try {
    const questions = chatbotService.getAllQuestions();
    res.status(200).json({
      success: true,
      count: questions.length,
      data: questions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get questions by category
const getQuestionsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const questions = chatbotService.getQuestionsByCategory(category);
    
    res.status(200).json({
      success: true,
      category: category,
      count: questions.length,
      data: questions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Filter schools by question - RETURN schoolId
const filterByQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const result = await chatbotService.filterSchoolsByQuestion(parseInt(questionId));
    
    res.status(200).json({
      success: true,
      count: result.count,
      schoolIds: result.schools // Changed from 'schools' to 'schoolIds'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Filter schools with multiple criteria - RETURN schoolId
const filterWithMultipleCriteria = async (req, res) => {
  try {
    const filters = req.body;
    const result = await chatbotService.filterSchoolsWithMultipleCriteria(filters);
    
    res.status(200).json({
      success: true,
      count: result.count,
      schoolIds: result.schools // Changed from 'schools' to 'schoolIds'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Search schools by name - RETURN schoolId
const searchSchools = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Search term is required'
      });
    }
    
    const result = await chatbotService.searchSchoolsByName(name);
    
    res.status(200).json({
      success: true,
      count: result.count,
      schoolIds: result.schools // Changed from 'schools' to 'schoolIds'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export default {
  getQuestions,
  getQuestionsByCategory,
  filterByQuestion,
  filterWithMultipleCriteria,
  searchSchools
};
