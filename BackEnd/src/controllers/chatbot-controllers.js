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
// Filter schools by question - RETURN schoolId (or AI names if useAI)
const filterByQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { useAI , area , city } = req.query; // Get AI flag from query params

    const useAiFlag = useAI === 'true';

    const result = await chatbotService.filterSchoolsByQuestion(
      parseInt(questionId),
      useAiFlag,
      area,
      city
    );

    if (useAiFlag) {
      // AI path => return AI text and recommended school NAMES
      res.status(200).json({
        success: true,
        count: Array.isArray(result.recommendedSchools) ? result.recommendedSchools.length : 0,
        recommendedSchools: result.recommendedSchools || [],
        aiResponse: result.aiResponse || null
      });
    } else {
      // DB path => return school IDs
      res.status(200).json({
        success: true,
        count: result.count || (result.schools ? result.schools.length : 0),
        schoolIds: result.schools || [],
        aiResponse: null
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const filterWithMultipleCriteria = async (req, res) => {
  try {
    const filters = req.body;
    const { useAI } = req.query; // Get AI flag from query params

    const useAiFlag = useAI === 'true';

    const result = await chatbotService.filterSchoolsWithMultipleCriteria(
      filters,
      useAiFlag
    );

    if (useAiFlag) {
      res.status(200).json({
        success: true,
        count: Array.isArray(result.recommendedSchools) ? result.recommendedSchools.length : 0,
        recommendedSchools: result.recommendedSchools || [],
        aiResponse: result.aiResponse || null
      });
    } else {
      res.status(200).json({
        success: true,
        count: result.count || (result.schools ? result.schools.length : 0),
        schoolIds: result.schools || [],
        aiResponse: null
      });
    }
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
