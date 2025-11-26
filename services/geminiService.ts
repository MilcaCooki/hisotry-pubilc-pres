import { GoogleGenAI } from "@google/genai";

// Ensure API key is present
const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

export const generateAiResponse = async (userPrompt: string, context: string): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please configure process.env.API_KEY.";
  }

  try {
    const systemInstruction = `
      You are an expert political science professor named "Polis AI".
      Your goal is to educate the user based on the provided presentation context.
      
      CONTEXT:
      ${context}

      RULES:
      1. Keep answers concise (max 3-4 sentences) unless asked for details.
      2. Use simple, engaging language suitable for students.
      3. If the question is unrelated to the context, try to bridge it back to political science or answer generally but briefly.
      4. Format your response with Markdown (bolding key terms).
      5. Answer in the same language as the user (mostly Russian).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "Извините, я не смог сгенерировать ответ.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Произошла ошибка при связи с AI. Попробуйте позже.";
  }
};