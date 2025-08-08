import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const askOpenAI = async (req, res) => {
  try {
    const userMessage = req.body.message;

    // Use the Gemini model
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash-latest" });

    const result = await model.generateContent(userMessage);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error('Gemini API error:', error);
    res.status(500).json({ error: 'Error contacting Gemini AI' });
  }
};
