import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Orchestrates multiple AI providers to maximize free processing limits.
 * Default: Gemini 1.5 Flash
 * Fallback: Groq (Llama 3) or Mistral
 */

const geminiClient = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const geminiModel = geminiClient.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateAIResponse(prompt: string, fallbackResponse: string = "") {
  // 1. Try Gemini
  if (process.env.GEMINI_API_KEY) {
    try {
      const result = await geminiModel.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error: any) {
      console.warn("Gemini Rate Limit or Error, trying Fallback Provider...", error.message);
    }
  }

  // 2. Try Groq (Llama 3) - Free, Fast, OpenAI compatible
  if (process.env.GROQ_API_KEY) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: 200
        })
      });
      const data = await res.json();
      if (data.choices?.[0]?.message?.content) {
        return data.choices[0].message.content.trim();
      }
    } catch (error: any) {
      console.error("Groq Fallback Error:", error.message);
    }
  }

  // 3. Absolute Fallback (Static)
  return fallbackResponse;
}

export async function explainRecommendation(careerName: string, userProfile: any) {
  const prompt = `
    You are an expert career guidance counselor for Class 12 students in India.
    Student Profile:
    - Stream: ${userProfile.stream}
    - Marks: ${userProfile.marks}%
    - Interests: ${userProfile.interests.join(", ")}
    
    Career Choice: ${careerName}
    
    Explain why this career is a strong match for this student in exactly one sentence (maximum 20 words). 
    No introductory text, just the explanation.
  `;

  return generateAIResponse(prompt, `A high-growth path aligned with your ${userProfile.stream} background and interests.`);
}
