import OpenAI from "openai";
import dotenv from "dotenv";
import fs from "fs";
import path from 'path';

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

// ✅ AI-Based Question Answering on Documents
export const askDocumentQuestion = async (documentText: string, question: string): Promise<string> => {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are an AI assistant that answers questions based on the provided document." },
          { role: "user", content: `Here is a document:\n\n${documentText}\n\nNow answer this question based on it: ${question}` },
        ],
        max_tokens: 300, // Limit response length
      });
  
      return completion.choices[0].message?.content || "I couldn't find an answer based on this document.";
    } catch (error) {
      console.error("❌ Error in AI Question Answering:", error);
      throw new Error("AI failed to answer the document question.");
    }
};

// ✅ AI-Based Explanation Generator (With Fun Analogies)
export const generateFunExplanation = async (text: string, age: number, interests: string): Promise<string> => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { 
          role: "system", 
          content: `You are an AI teacher who simplifies concepts using fun analogies. 
          The user is ${age} years old and loves ${interests}. 
          Explain the following document in a way that is engaging and relatable to them.
          Use analogies, storytelling, and humor where appropriate.` 
        },
        { role: "user", content: text },
      ],
      max_tokens: 500, // Allow space for detailed yet concise explanations
    });

    return completion.choices[0].message?.content || "Sorry, I couldn't generate an explanation.";
  } catch (error) {
    console.error("❌ Error generating fun explanation:", error);
    throw new Error("Failed to generate an engaging explanation.");
  }
};

// ✅ Convert Text to Speech Using OpenAI TTS (Save per Document)
export const convertTextToSpeech = async (text: string, userId: string, documentId: string): Promise<string> => {
  try {
    const response = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: text,
    });

    // ✅ Define unique audio file path per document
    const audioFileName = `audio_tutor_${documentId}.mp3`;
    const filePath = path.join(__dirname, "../../public/audio", audioFileName);

    // ✅ Save audio file
    const audioStream = await response.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(audioStream));

    return `/audio/${audioFileName}`; // ✅ Return URL for frontend playback
  } catch (error) {
    console.error("❌ Error generating speech:", error);
    throw new Error("Failed to generate text-to-speech audio.");
  }
};