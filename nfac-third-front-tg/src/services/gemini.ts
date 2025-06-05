import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);

export const generateGeminiResponse = async (messageText: string): Promise<string> => {
    if (!API_KEY) {
        console.error("Gemini API key not loaded. Make sure to set VITE_GEMINI_API_KEY in your .env file.");
        return "Error: Gemini API key not configured.";
    }

    try {
        // Get the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Generate content
        const result = await model.generateContent(messageText);
        const response = await result.response;
        return response.text();

    } catch (error) {
        console.error("Error generating Gemini response:", error);
        return "Error: Could not get response from AI.";
    }
}; 