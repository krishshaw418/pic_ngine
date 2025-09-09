import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";

async function memeGen() {

  const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_IMAGEN_API_KEY
  });

  try {
    const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt: 'Robot holding a red skateboard',
    config: {
      numberOfImages: 4,
    },
  });

  let idx = 1;
  for (const generatedImage of response.generatedImages!) {
    let imgBytes = generatedImage.image!.imageBytes;
    const buffer = Buffer.from(imgBytes!, "base64");
    fs.writeFileSync(`../src/images/imagen-${idx}.png`, buffer);
    idx++;
  }
  } catch (error) {
    console.log("Error", error);
    return;
  }
}

export default memeGen;