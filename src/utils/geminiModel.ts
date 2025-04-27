import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

// Initialize Gemini model
export const initGeminiModel = (apiKey: string) => {
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
};

// Function to analyze car images
export const analyzeCarImage = async (filePath: string, model: any) => {
  try {
    const imageBytes = fs.readFileSync(filePath);
    const base64Image = imageBytes.toString("base64");
    
    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: "image/jpeg", // or image/png depending on your input
          data: base64Image,
        },
      },
      `
      Please analyze the image and extract:
      - Car model and make (if identifiable)
      - License Plate number (if visible)
      - Car color (be specific, e.g., "Metallic Grey", "Dark Red")
      
      Respond with:
      Car Model: [text]
      License Plate: [text]
      Car Color: [text]
      `,
    ]);
    console.log("Generated response:", result.response.text());
    return result.response.text();
  } catch (error) {
    console.error("Error analyzing car image:", error);
    throw error;
  }
};