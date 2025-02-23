import OpenAI from "openai";
import dotenv from "dotenv";
import fs from "fs";
import path from 'path';
import { Readable } from "stream";
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

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
          content: `You are an engaging and knowledgeable AI teacher who excels at breaking down 
          complex concepts using creative analogies, vivid storytelling, and a touch of humor. 
          The user is ${age} years old and has a keen interest in ${interests}. 
          Your task is to simplify and explain the content of the following document in a way that is both accessible and captivating. 
          Begin by summarizing the key points of the document, then provide a detailed explanation that:
          - Uses creative analogies to clarify difficult concepts.
          - Incorporates storytelling to make the content relatable.
          - Infuses humor appropriately to keep the explanation fun and engaging.
          - Reflects the user's interests to create a personalized learning experience.

          Ensure that your explanation is clear, concise, and tailored to the user's age and passions.` 
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
export const convertTextToSpeech = async (
  text: string,
  userId: string,
  documentId: string
): Promise<string> => {
  try {
    const response = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: text,
    });

    // Convert the response to a Buffer
    const audioArrayBuffer = await response.arrayBuffer();
    const audioBuffer = Buffer.from(audioArrayBuffer);

    // Use GridFSBucket to store the audio in MongoDB
    // const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: "audio" });
    const db = mongoose.connection.db;
if (!db) {
  throw new Error("Database connection is not established.");
}
const bucket = new GridFSBucket(db, { bucketName: "audio" });
    const audioFileName = `audio_tutor_${documentId}.mp3`;

    // Create an upload stream with some metadata
    const uploadStream = bucket.openUploadStream(audioFileName, {
      contentType: "audio/mpeg",
      metadata: { userId, documentId },
    });

    // Create a readable stream from the buffer
    const readableStream = new Readable();
    readableStream.push(audioBuffer);
    readableStream.push(null);

    // Pipe the audio buffer into GridFS and wait for the upload to finish
    await new Promise((resolve, reject) => {
      readableStream
        .pipe(uploadStream)
        .on("error", reject)
        .on("finish", resolve);
    });

    // Return a URL endpoint for streaming the audio from GridFS
    // The file's ObjectId (uploadStream.id) is used in the stream route.
    return `/audio/stream/${uploadStream.id}`;
  } catch (error) {
    console.error("❌ Error generating speech:", error);
    throw new Error("Failed to generate text-to-speech audio.");
  }
};