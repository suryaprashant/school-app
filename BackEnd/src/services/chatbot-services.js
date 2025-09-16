 
import School from '../models/school-model.js';
import AIService from './chatbot-ai-services.js';

class ChatbotService {
  constructor() {
    this.questions = this.getPredefinedQuestions();
     this.aiService = new AIService();
  }

  // Get all predefined questions with answers embedded
  getPredefinedQuestions() {
    return [
      {
        id: 1,
        question: "Schools with annual fee range 1000 - 10000",
        field: "feeRange",
        value: "1000 - 10000"
      },
      {
        id: 2,
        question: "Schools with annual fee range 10000 - 25000", 
        field: "feeRange",
        value: "10000 - 25000"
      },
      {
        id: 3,
        question: "Schools with annual fee range 25000 - 50000",
        field: "feeRange", 
        value: "25000 - 50000"
      },
      {
        id: 4,
        question: "Schools with annual fee range 50000 - 75000",
        field: "feeRange",
        value: "50000 - 75000"
      },
      {
        id: 5,
        question: "Schools with annual fee range 75000 - 100000",
        field: "feeRange",
        value: "75000 - 100000"
      },
      {
        id: 6,
        question: "Schools with annual fee range 1 Lakh - 2 Lakh",
        field: "feeRange",
        value: "1 Lakh - 2 Lakh"
      },
      {
        id: 7,
        question: "Schools with annual fee range 2 Lakh - 3 Lakh",
        field: "feeRange",
        value: "2 Lakh - 3 Lakh"
      },
      {
        id: 8,
        question: "Schools with annual fee range 3 Lakh - 4 Lakh",
        field: "feeRange",
        value: "3 Lakh - 4 Lakh"
      },
      {
        id: 9,
        question: "Schools with annual fee range 4 Lakh - 5 Lakh",
        field: "feeRange",
        value: "4 Lakh - 5 Lakh"
      },
      {
        id: 10,
        question: "Schools with annual fee range More than 5 Lakh",
        field: "feeRange",
        value: "More than 5 Lakh"
      },
      {
        id: 11,
        question: "Schools with board CBSE",
        field: "board",
        value: "CBSE"
      },
      {
        id: 12,
        question: "Schools with board ICSE",
        field: "board",
        value: "ICSE"
      },
      {
        id: 13,
        question: "Schools with board STATE",
        field: "board",
        value: "STATE"
      },
      {
        id: 14,
        question: "Schools with board OTHER",
        field: "board",
        value: "OTHER"
      },
      {
        id: 15,
        question: "Schools with school mode convent",
        field: "schoolMode",
        value: "convent"
      },
      {
        id: 16,
        question: "Schools with school mode private",
        field: "schoolMode",
        value: "private"
      },
      {
        id: 17,
        question: "Schools with school mode government",
        field: "schoolMode",
        value: "government"
      },
      {
        id: 18,
        question: "Schools with gender type boy",
        field: "genderType",
        value: "boy"
      },
      {
        id: 19,
        question: "Schools with gender type girl",
        field: "genderType",
        value: "girl"
      },
      {
        id: 20,
        question: "Schools with gender type co-ed",
        field: "genderType",
        value: "co-ed"
      },
      {
        id: 21,
        question: "Schools with transport available yes",
        field: "transportAvailable",
        value: "yes"
      },
      {
        id: 22,
        question: "Schools with transport available no",
        field: "transportAvailable",
        value: "no"
      },
       {
        id: 23,
        question: "Schools with rank A+",
        field: "rank",
        value: "A+"
      },
      {
        id: 24,
        question: "Schools with rank A",
        field: "rank",
        value: "A"
      },
      {
        id: 25,
        question: "Schools with rank B+",
        field: "rank",
        value: "B+"
      },
      {
        id: 26,
        question: "Schools with rank B",
        field: "rank",
        value: "B"
      },
      {
        id: 27,
        question: "Schools with rank C+",
        field: "rank",
        value: "C+"
      },
      {
        id: 28,
        question: "Schools with rank C",
        field: "rank",
        value: "C"
      },
      {
        id: 29,
        question: "Schools with rank D",
        field: "rank",
        value: "D"
      }
    ];
  }

  // Get all predefined questions
  getAllQuestions() {
    return this.questions;
  }

  // Get questions by category
  getQuestionsByCategory(category) {
    return this.questions.filter(q => q.field === category);
  }



 async searchSchoolsByName(searchTerm) {
    try {
      const schools = await School.find({
        name: { $regex: searchTerm, $options: 'i' }
      }).select('_id'); // Select only _id
      
      // Return school IDs instead of names
      return {
        count: schools.length,
        schools: schools.map(school => school._id)
      };
    } catch (error) {
      throw new Error(`Error searching schools: ${error.message}`);
    }
  }

   async getAIRecommendations(filters) {
    try {
      return await this.aiService.getSchoolRecommendations(filters);
    } catch (error) {
      console.error('AI Recommendation Error:', error);
      // Fallback to regular filtering
      const schools = await School.find(filters).select('_id');
      return {
        aiResponse: "Here are schools matching your criteria:",
        recommendedSchools: schools.map(school => school._id.toString())
      };
    }
  }

  // Update filter methods to optionally use AI
  async filterSchoolsWithMultipleCriteria(filters, useAI = false) {
    try {
      if (useAI) {
        return await this.getAIRecommendations(filters);
      } else {
        const schools = await School.find(filters).select('_id');
        return {
          count: schools.length,
          schools: schools.map(school => school._id.toString()),
          aiResponse: null
        };
      }
    } catch (error) {
      throw new Error(`Error filtering schools: ${error.message}`);
    }
  }

  async filterSchoolsByQuestion(questionId, useAI = false) {
    const question = this.questions.find(q => q.id === questionId);
    
    if (!question) {
      throw new Error('Question not found');
    }

    const filter = {};
    filter[question.field] = question.value;

    if (useAI) {
      return await this.getAIRecommendations(filter);
    } else {
      const schools = await School.find(filter).select('_id');
      return {
        count: schools.length,
        schools: schools.map(school => school._id.toString()),
        aiResponse: null
      };
    }
  }
}



export default ChatbotService;

