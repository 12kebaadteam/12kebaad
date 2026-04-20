import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function explainRecommendation(careerName: string, userProfile: any) {
  const prompt = `
    You are an expert career guidance counselor for Class 12 students in India.
    
    Student Profile:
    - Stream: ${userProfile.stream}
    - Marks: ${userProfile.marks}%
    - Interests: ${userProfile.interests.join(", ")}
    - Budget: ${userProfile.budget ? `₹${userProfile.budget}` : "Not specified"}
    
    Career Choice: ${careerName}
    
    Explain why this career is a strong match for this student in exactly one sentence (maximum 20 words). 
    Be specific about how it aligns with their interests or stream.
    No introductory text, just the explanation.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error("Gemini Error:", error);
    return `A high-growth path aligned with your ${userProfile.stream} background and interests.`;
  }
}
