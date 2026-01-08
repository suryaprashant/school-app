// src/services/chatbot-ai-services.js
import axios from 'axios';

class AIService {

  
  constructor() {
    this.apiKey = process.env.API_KEY; // set in .env
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta';
    this.model = 'models/gemini-pro-latest'; // model to use
  }


  /**
   * Public method: returns { aiResponse, recommendedSchools }
   * - aiResponse: cleaned text returned by AI (comma-separated names)
   * - recommendedSchools: array of names (split and trimmed)
   */


// Inside the AIService class
async getSchoolRecommendations(filters = {}) {
  try {
    const promptText = this.buildPrompt(filters);
    // aiText is now a JSON string, e.g., '[{"name": "...", "website": "..."}]'
    const aiText = await this.callGeminiAI(promptText);

    // Parse the JSON string into a JavaScript array of objects
    const recommendedSchools = JSON.parse(aiText); 
    
    return {
      aiResponse: aiText, // You can still return the raw string if needed
      recommendedSchools, // This is now an array of objects
    };
  } catch (err) {
    console.error('AIService.getSchoolRecommendations error:', err);
    // Fallback can be a simple array of objects too
    const fallbackSchools = [
      { name: 'Excel Academy', website: 'https://www.google.com/search?q=Excel+Academy' },
      { name: 'Bright Future International', website: 'https://www.google.com/search?q=Bright+Future+International' },
    ];
    return {
      aiResponse: 'Could not fetch recommendations at this time.',
      recommendedSchools: fallbackSchools,
    };
  }
}

  // Build a short, precise prompt from filters
  buildPrompt(filters) {
    const criteria = Object.entries(filters)
      .map(([k, v]) => `${this.formatFilterName(k)}: ${v}`)
      .join(', ');

    return `Based on these criteria: ${criteria}

Generate a list of 3  school names that match the criteria.
For each school, provide its name and a plausible, realistic website URL.
Return ONLY a valid JSON array of objects, where each object has a "name" and a "website" key.
If you cannot find or create a realistic website for a school, use null for the website value.

Example format:
[
  {"name": "Excel Academy", "website": "https://www.excelacademy.edu.in"},
  {"name": "Bright Future International", "website": "https://www.brightfutureintl.org"},
  {"name": "Knowledge Heights School", "website": "https://www.knowledgeheights.ac.in"}
]`;
}

  // Friendly mapping of filter keys -> readable names
  formatFilterName(key) {
    const map = {
      area :'area',
      feeRange: 'Fee Range',
      board: 'Education Board',
      schoolMode: 'School Type',
      genderType: 'Gender Type',
      transportAvailable: 'Transport Availability',
      rank: 'School Rank',
    };
    return map[key] || key;
  }

  // Call Gemini (Generative Language API) with correct payload
  async callGeminiAI(promptText) {
    if (!this.apiKey) {
      throw new Error('Missing API_KEY in environment (process.env.API_KEY).');
    }

    const url = `${this.baseUrl}/${this.model}:generateContent?key=${this.apiKey}`;

    const body = {
      // contents array — text goes in parts[].text
      contents: [
        {
          role: 'user',
          parts: [
            { text: promptText }
          ]
        }
      ],
      // generationConfig holds temperature, tokens etc.
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 4000,
        topP: 0.8,
        topK: 40
      }
    };

    try {
      const resp = await axios.post(url, body, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 30000,
      });

      // resp.data.candidates[0].content.parts[0].text is typical
      if (resp.data && Array.isArray(resp.data.candidates) && resp.data.candidates.length > 0) {
        const candidate = resp.data.candidates[0];
        // Some versions return candidate.content.parts[0].text
        const text = candidate?.content?.parts?.[0]?.text;
      if (text && typeof text === 'string') {
  // Use the new JSON cleaning function
  return this.cleanAndExtractJson(text);
}
      }

      // If we didn't find the expected structure, log response and throw
      console.error('Unexpected Gemini response:', JSON.stringify(resp.data, null, 2));
      throw new Error('Unexpected response format from Gemini API');
    } catch (err) {
      // For debugging - log server response body if available
      if (err?.response?.data) {
        console.error('Gemini API call failed:', JSON.stringify(err.response.data, null, 2));
      } else {
        console.error('Gemini API call error:', err.message || err);
      }
      // Rethrow so caller can fallback
      throw err;
    }
  }
cleanAndExtractJson(response) {
  // Find the first '[' and the last ']' to extract the array
  const startIndex = response.indexOf('[');
  const endIndex = response.lastIndexOf(']');

  if (startIndex === -1 || endIndex === -1) {
    console.error("AI response did not contain a valid JSON array:", response);
    throw new Error('Could not find a valid JSON array in the AI response.');
  }

  // Extract and return the clean JSON string
  return response.substring(startIndex, endIndex + 1);
}
  // Clean: keep last non-empty line, remove quotes, return comma-separated string
  cleanAIResponse(response) {
    let cleaned = String(response).trim();
    // remove surrounding quotes if any
    cleaned = cleaned.replace(/^["']|["']$/g, '');

    // break into lines, pick the last non-empty line (often the actual list)
    const lines = cleaned.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const candidateLine = lines.length ? lines[lines.length - 1] : cleaned;

    // remove any leading labels like "1." or "1)" etc
    const noNumbering = candidateLine.replace(/^\d+\s*[\.\)]\s*/, '');

    // remove any stray explanatory text — naive heuristic: keep only commas, letters, numbers, & punctuation in names
    // but avoid removing legitimate characters; main goal is to trim whitespace
    const finalLine = noNumbering.trim();

    // ensure comma-separated format, collapse multiple commas/spaces
    const normalized = finalLine.split(',')
      .map(s => s.trim())
      .filter(Boolean)
      .join(', ');

    return normalized;
  }

  // Convert comma-separated to array
  parseNames(commaSeparated) {
    if (!commaSeparated || typeof commaSeparated !== 'string') return [];
    return commaSeparated
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
  }

  // Fallback when API fails
  createFallbackResponse() {
    return 'Excel Academy, Bright Future International, Knowledge Heights School';
  }
}

export default new AIService();
