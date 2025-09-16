import axios from 'axios';
import School from '../models/school-model.js';

class AIService {
  constructor() {
    this.apiKey = process.env.API_KEY;
    this.apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
  }

  async getSchoolRecommendations(filters) {
    let matchingSchools;
    try {
      matchingSchools = await School.find(filters).select('name board feeRange rank city state schoolMode genderType transportAvailable');
      
      if (matchingSchools.length === 0) {
        return {
          aiResponse: "I couldn't find any schools matching your criteria. Please try different filters.",
          recommendedSchools: []
        };
      }

      const prompt = this.buildPrompt(filters, matchingSchools);
      const aiResponse = await this.callGeminiAI(prompt, matchingSchools);
      
      return {
        aiResponse: aiResponse,
        recommendedSchools: matchingSchools.map(school => school._id.toString())
      };
    } catch (error) {
      console.error('AI Service Error:', error);
      if (!matchingSchools) {
        matchingSchools = await School.find(filters).select('_id');
      }
      return {
        aiResponse: "Here are schools matching your criteria:",
        recommendedSchools: matchingSchools.map(school => school._id.toString())
      };
    }
  }

  buildPrompt(filters, schools) {
    const criteria = Object.entries(filters)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');

    const schoolList = schools.slice(0, 10).map(school => 
      `- ${school.name} (${school.board}, ${school.feeRange}, ${school.rank || 'No rank'}, ${school.city})`
    ).join('\n');

    return `Based on these criteria: ${criteria}

Available schools:
${schoolList}

Return ONLY a comma-separated list of the top 3 most suitable school names from the available list. 
Do not include any other text, explanations, or formatting. 
Just the school names separated by commas.

Example format: "School Name A, School Name B, School Name C"`;
  }

  async callGeminiAI(prompt, matchingSchools) {
    try {
      // First, let's check what models are available
      const modelsResponse = await axios.get(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${this.apiKey}`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );


      // Try to find the correct model
      const availableModels = modelsResponse.data.models;
      const geminiModel = availableModels.find(model => 
        model.name.includes('gemini') && 
        model.supportedGenerationMethods.includes('generateContent')
      );

      if (!geminiModel) {
        throw new Error('No suitable Gemini model found with generateContent support');
      }

      

      // Use the correct model
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/${geminiModel.name}:generateContent?key=${this.apiKey}`,
        {
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.1, // Lower temperature for more deterministic output
            maxOutputTokens: 100, // Fewer tokens since we only need names
            topP: 0.8,
            topK: 40
          }
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 15000
        }
      );

      if (response.data && response.data.candidates && response.data.candidates[0]) {
        const aiResponse = response.data.candidates[0].content.parts[0].text;
        
        // Clean up the response to ensure it's just comma-separated names
        return this.cleanAIResponse(aiResponse);
      } else {
        throw new Error('Unexpected response format from Gemini API');
      }

    } catch (error) {
    
      
      // Fallback response with the actual matchingSchools data
      return this.createFallbackResponse(matchingSchools);
    }
  }

  cleanAIResponse(response) {
    // Remove any quotes, extra spaces, and non-name text
    let cleaned = response.trim();
    
    // Remove quotes if present
    cleaned = cleaned.replace(/["']/g, '');
    
    // Remove any introductory text or explanations
    const lines = cleaned.split('\n');
    const lastLine = lines[lines.length - 1].trim();
    
    // Extract just the comma-separated names
    const namesOnly = lastLine.split(',')
      .map(name => name.trim())
      .filter(name => name.length > 0)
      .join(', ');
    
    return namesOnly;
  }

  createFallbackResponse(matchingSchools) {
    if (!matchingSchools || matchingSchools.length === 0) {
      return "No schools found";
    }

    // Return top 3 school names as comma-separated list
    const topSchools = matchingSchools.slice(0, 3);
    return topSchools.map(school => school.name).join(', ');
  }
}

export default AIService;