import School from '../models/school-model.js';

class ChatbotService {
  constructor() {
    this.questions = this.getPredefinedQuestions();
  }

  // Get all predefined questions with answers embedded
  getPredefinedQuestions() {
    return [
      {
        id: 1,
        question: "Schools with fee range 1000 - 10000",
        field: "feeRange",
        value: "1000 - 10000"
      },
      {
        id: 2,
        question: "Schools with fee range 10000 - 25000", 
        field: "feeRange",
        value: "10000 - 25000"
      },
      {
        id: 3,
        question: "Schools with fee range 25000 - 50000",
        field: "feeRange", 
        value: "25000 - 50000"
      },
      {
        id: 4,
        question: "Schools with fee range 50000 - 75000",
        field: "feeRange",
        value: "50000 - 75000"
      },
      {
        id: 5,
        question: "Schools with fee range 75000 - 100000",
        field: "feeRange",
        value: "75000 - 100000"
      },
      {
        id: 6,
        question: "Schools with fee range 1 Lakh - 2 Lakh",
        field: "feeRange",
        value: "1 Lakh - 2 Lakh"
      },
      {
        id: 7,
        question: "Schools with fee range 2 Lakh - 3 Lakh",
        field: "feeRange",
        value: "2 Lakh - 3 Lakh"
      },
      {
        id: 8,
        question: "Schools with fee range 3 Lakh - 4 Lakh",
        field: "feeRange",
        value: "3 Lakh - 4 Lakh"
      },
      {
        id: 9,
        question: "Schools with fee range 4 Lakh - 5 Lakh",
        field: "feeRange",
        value: "4 Lakh - 5 Lakh"
      },
      {
        id: 10,
        question: "Schools with fee range More than 5 Lakh",
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

  // Filter schools based on a specific question - SIMPLIFIED RESPONSE
  async filterSchoolsByQuestion(questionId) {
    const question = this.questions.find(q => q.id === questionId);
    
    if (!question) {
      throw new Error('Question not found');
    }

    const filter = {};
    filter[question.field] = question.value;

    try {
      const schools = await School.find(filter).select('name');
      
      // Simplified response with only count and school names
      return {
        count: schools.length,
        schools: schools.map(school => school.name)
      };
    } catch (error) {
      throw new Error(`Error filtering schools: ${error.message}`);
    }
  }

  // Filter schools with multiple criteria - SIMPLIFIED RESPONSE
  async filterSchoolsWithMultipleCriteria(filters) {
    try {
      const schools = await School.find(filters).select('name');
      
      // Simplified response with only count and school names
      return {
        count: schools.length,
        schools: schools.map(school => school.name)
      };
    } catch (error) {
      throw new Error(`Error filtering schools: ${error.message}`);
    }
  }

  // Search schools by name - SIMPLIFIED RESPONSE
  async searchSchoolsByName(searchTerm) {
    try {
      const schools = await School.find({
        name: { $regex: searchTerm, $options: 'i' }
      }).select('name');
      
      // Simplified response with only count and school names
      return {
        count: schools.length,
        schools: schools.map(school => school.name)
      };
    } catch (error) {
      throw new Error(`Error searching schools: ${error.message}`);
    }
  }
}

export default ChatbotService;