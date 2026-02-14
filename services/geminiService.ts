import { GoogleGenAI } from "@google/genai";
import { AspectRatio } from "../types";

// Initialize the Gemini API client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateImageWithGemini = async (
  prompt: string,
  aspectRatio: AspectRatio
): Promise<string> => {
  try {
    // Using the "Nano Banana" model alias as requested: gemini-2.5-flash-image
    const modelId = "gemini-2.5-flash-image";

    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio,
        },
      },
    });

    if (!response.candidates || response.candidates.length === 0) {
      throw new Error("لم يتم تلقي أي مرشحات من النموذج.");
    }

    const content = response.candidates[0].content;
    
    // Iterate through parts to find the image
    if (content && content.parts) {
      for (const part of content.parts) {
        if (part.inlineData && part.inlineData.data) {
          const base64Data = part.inlineData.data;
          const mimeType = part.inlineData.mimeType || "image/png";
          return `data:${mimeType};base64,${base64Data}`;
        }
      }
    }

    throw new Error("لم يتم العثور على بيانات صورة في الاستجابة.");
  } catch (error: any) {
    console.error("Gemini Image Generation Error:", error);
    throw new Error(error.message || "حدث خطأ غير متوقع أثناء إنشاء الصورة.");
  }
};
