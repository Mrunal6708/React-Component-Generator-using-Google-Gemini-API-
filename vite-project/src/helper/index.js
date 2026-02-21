import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const ai = new GoogleGenAI({apikey: GEMINI_API_KEY});

export const generateContent = async () => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Write a comprehensive essay on Ai,do not give markdown responses , give pure",
  });
  console.log(response);
};

//export default generateContent;


