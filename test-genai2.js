import { GoogleGenAI } from '@google/genai';

async function main() {
  const apiKey = "AIzaSyAnqL9Ik6sElvHvPqWToFyCWjoK8Amnq-I";
  console.log("Using API Key:", apiKey);
  const ai = new GoogleGenAI({ apiKey: apiKey });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: "Hello",
    });
    console.log("Success:", response.text);
  } catch (e) {
    console.error("Error:", e);
  }
}

main();
