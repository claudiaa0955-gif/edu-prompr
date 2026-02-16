
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const refineScript = async (originalScript: string, objective: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `你是一位短影音腳本專家。請根據以下原始腳本和目標進行優化。
      目標：${objective}
      原始腳本：${originalScript}
      
      請直接輸出優化後的腳本內容，不要包含多餘的解釋或標籤。腳本應該口語化，適合 30-60 秒的短片拍攝。`,
      config: {
        temperature: 0.7,
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text || "無法產生優化腳本，請稍後再試。";
  } catch (error) {
    console.error("Gemini refinement error:", error);
    throw error;
  }
};

export const generateInitialScript = async (topic: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `請幫我寫一個關於「${topic}」的 30 秒短影音腳本。
      這是一個給學生使用的教育類或自我介紹類的腳本。
      請直接輸出腳本內容，保持親切有趣的語氣。`,
      config: {
        temperature: 0.8,
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text || "無法產生腳本，請稍後再試。";
  } catch (error) {
    console.error("Gemini generation error:", error);
    throw error;
  }
};
