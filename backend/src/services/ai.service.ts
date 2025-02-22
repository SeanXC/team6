import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

// ✅ Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

// ✅ AI-Based Summarization with Personalized Fun Fact
export const summarizeText = async (text: string, age: number, interests: string): Promise<string> => {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: `You are an AI assistant summarizing documents. 
            The user is ${age} years old and is interested in ${interests}. 
            Provide a fun fact from the text related to one of or all their interests. Make it short and concise` },
          { role: "user", content: text },
        ],
        max_tokens: 400, // Allow space for summary + fun fact
      });
  
      return completion.choices[0].message?.content || "Summary unavailable.";
    } catch (error) {
      console.error("❌ Error in AI Summarization:", error);
      throw new Error("AI Summarization failed.");
    }
  };