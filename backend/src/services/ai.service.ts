import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

// ✅ Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

// ✅ AI-Based Summarization Function (Updated for New OpenAI SDK)
export const summarizeText = async (text: string): Promise<string> => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "From the text, give a short and intriguing fun fact" },
        { role: "user", content: text },
      ],
      max_tokens: 300, // Limit response length
    });

    return completion.choices[0].message?.content || "Summary unavailable.";
  } catch (error) {
    console.error("❌ Error in AI Summarization:", error);
    throw new Error("AI Summarization failed.");
  }
};