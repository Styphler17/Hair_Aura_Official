import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_INSTRUCTION } from '../constants';

const apiKey = import.meta.env.VITE_API_KEY || process.env.API_KEY || ''; 

// We initialize loosely to avoid crashing if env is missing during dev, 
// but in prod it is required.
const genAI = new GoogleGenerativeAI(apiKey);

export const createChatStream = async (history: {role: 'user' | 'model', text: string}[], newMessage: string) => {
  if (!apiKey) {
    throw new Error("API Key not configured");
  }

  const model = genAI.getGenerativeModel({ 
    model: 'gemini-2.0-flash-exp',
    systemInstruction: SYSTEM_INSTRUCTION,
  });

  // Convert history to format expected by SDK
  const chatHistory = history.map(h => ({
    role: h.role === 'user' ? 'user' : 'model',
    parts: [{ text: h.text }]
  }));

  const chat = model.startChat({
    history: chatHistory,
  });

  const result = await chat.sendMessageStream(newMessage);

  return result.stream;
};