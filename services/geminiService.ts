import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

const apiKey = process.env.API_KEY || ''; 

// We initialize loosely to avoid crashing if env is missing during dev, 
// but in prod it is required.
const ai = new GoogleGenAI({ apiKey });

export const createChatStream = async (history: {role: 'user' | 'model', text: string}[], newMessage: string) => {
  if (!apiKey) {
    throw new Error("API Key not configured");
  }

  // Convert history to format expected by SDK if needed, 
  // or just use the chat session state. 
  // Here we will use a fresh chat session logic for simplicity or maintain it in component.
  
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
    history: history.map(h => ({
      role: h.role,
      parts: [{ text: h.text }]
    }))
  });

  const result = await chat.sendMessageStream({
    message: newMessage
  });

  return result;
};