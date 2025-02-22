import { Request, Response } from "express";
import fs from "fs";
import pdfParse from "pdf-parse";
import Document from "../models/Document";
import { askDocumentQuestion, convertTextToSpeech, generateFunExplanation, summarizeText } from "../services/ai.service";
import User from "../models/User";
import path from "path";

// ✅ Ensure `req.user` follows the `authenticate` middleware format
interface AuthenticatedRequest extends Request {
  user?: { userId: string };
}

// ✅ Upload & Process Document (Authenticated Users Only)

export const uploadDocument:any = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user || !req.user.userId) {
      res.status(401).json({ error: "Unauthorized: No valid user found." });
      return;
    }

    if (!req.file) {
      res.status(400).json({ error: "No file uploaded!" });
      return;
    }

    // ✅ Ensure `uploads/` directory exists
    const uploadDir = path.join(__dirname, "../../uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
      console.log("📂 Created 'uploads' directory.");
    }

    // ✅ Define the file path
    const filePath = path.join(uploadDir, req.file.originalname);

    // ✅ Write file to the server
    fs.writeFileSync(filePath, req.file.buffer);
    console.log("📂 File saved:", filePath);

    // ✅ Extract text from PDF
    const data = await pdfParse(req.file.buffer);
    const extractedText = data.text.trim();

    console.log("📄 Extracted Text:", extractedText);

    // ✅ Save document to MongoDB, linking it to the authenticated user
    const newDocument = new Document({
      userId: req.user.userId, // ✅ Associate the document with the authenticated user
      filename: req.file.originalname,
      text: extractedText,
    });

    await newDocument.save();
    console.log("✅ Document saved successfully:", newDocument);

    res.json({
      message: "Document processed and saved successfully!",
      document: newDocument,
    });
  } catch (error) {
    console.error("❌ Error processing document:", error);
    res.status(500).json({ error: "Failed to process document!" });
  }
};
// ✅ Fetch Only Documents Uploaded by the Authenticated User
export const getDocuments:any = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      if (!req.user || !req.user.userId) {
        res.status(401).json({ error: "Unauthorized: No valid user found." });
        return;
      }
  
      const userId = req.user.userId; // ✅ Get user ID from JWT token
      const documents = await Document.find({ userId });
  
      if (!documents.length) {
        res.status(404).json({ message: "No documents found for this user!" });
        return;
      }
  
      res.json({ documents });
    } catch (error) {
      console.error("❌ Error fetching documents:", error);
      res.status(500).json({ error: "Failed to fetch documents!" });
    }
};

// ✅ Summarize Document and Store in Database
export const summarizeDocument:any = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      if (!req.user || !req.user.userId) {
        res.status(401).json({ error: "Unauthorized: No valid user found." });
        return;
      }
  
      const { documentId } = req.params;
      const userId = req.user.userId;
  
      // ✅ Fetch user details (age & interests)
      const user = await User.findById(userId);
      if (!user) {
        res.status(404).json({ error: "User not found!" });
        return;
      }
  
      const userAge = user.age;
      const userInterests = user.interests?.length > 0 ? user.interests.join(", ") : "various topics";
  
      console.log("🧑 User Details:", { age: userAge, interests: userInterests });
  
      // ✅ Ensure document belongs to the authenticated user
      const document = await Document.findOne({ _id: documentId, userId });
      if (!document) {
        res.status(404).json({ error: "Document not found or access denied." });
        return;
      }
  
      // ✅ If the document is already summarized, return stored summary
      if (document.summary) {
        console.log("✅ Returning stored summary");
        res.json({
          message: "Summary retrieved from database!",
          documentId: document._id,
          summary: document.summary,
        });
        return;
      }
  
      console.log("📄 Summarizing Document:", document.filename);
  
      // ✅ Summarize text using AI
      const summary = await summarizeText(document.text, userAge, userInterests);
  
      // ✅ Update document with the summary in MongoDB
      document.summary = summary;
      await document.save();
  
      console.log("✅ Summary saved to database");
  
      res.json({
        message: "Document summarized and saved successfully!",
        documentId: document._id,
        summary,
      });
    } catch (error) {
      console.error("❌ Error summarizing document:", error);
      res.status(500).json({ error: "Failed to summarize document!" });
    }
};

// ✅ Fetch Summarized Documents (Only Summarized Docs)
export const getSummarizedDocuments:any = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      if (!req.user || !req.user.userId) {
        res.status(401).json({ error: "Unauthorized: No valid user found." });
        return;
      }
  
      const userId = req.user.userId;
  
      // ✅ Find only documents that have summaries
      const documents = await Document.find({ userId, summary: { $ne: null } });
  
      if (!documents.length) {
        res.status(404).json({ message: "No summarized documents found!" });
        return;
      }
  
      res.json({ documents });
    } catch (error) {
      console.error("❌ Error fetching summarized documents:", error);
      res.status(500).json({ error: "Failed to fetch summarized documents!" });
    }
};

// ✅ Fetch a Single Summarized Document
export const getSingleSummarizedDocument:any = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      if (!req.user || !req.user.userId) {
        res.status(401).json({ error: "Unauthorized: No valid user found." });
        return;
      }
  
      const { documentId } = req.params;
      const userId = req.user.userId;
  
      // ✅ Ensure document exists and belongs to the authenticated user
      const document = await Document.findOne({ _id: documentId, userId });
  
      if (!document) {
        res.status(404).json({ error: "Document not found or access denied." });
        return;
      }
  
      // ✅ Ensure the document has a summary
      if (!document.summary) {
        res.status(400).json({ error: "This document has not been summarized yet." });
        return;
      }
  
      res.json({
        message: "Summarized document retrieved successfully!",
        documentId: document._id,
        summary: document.summary,
      });
    } catch (error) {
      console.error("❌ Error fetching summarized document:", error);
      res.status(500).json({ error: "Failed to fetch summarized document!" });
    }
};

// ✅ Chat-Based Q&A on Documents
// ✅ Chat-Based Q&A on Documents (Now Stores Chat History)
export const chatWithDocument:any = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      if (!req.user || !req.user.userId) {
        res.status(401).json({ error: "Unauthorized: No valid user found." });
        return;
      }
  
      const { documentId } = req.params;
      const { question } = req.body;
      const userId = req.user.userId;
  
      if (!question) {
        res.status(400).json({ error: "Question is required." });
        return;
      }
  
      // ✅ Ensure the document belongs to the user
      const document = await Document.findOne({ _id: documentId, userId });
  
      if (!document) {
        res.status(404).json({ error: "Document not found or access denied." });
        return;
      }
  
      console.log(`📖 User asked: "${question}" about document: ${document.filename}`);
  
      // ✅ Ask AI a question based on the document content
      const answer = await askDocumentQuestion(document.text, question);
  
      // ✅ Store the Q&A in the document's chat history
      document.chatHistory.push({ question, answer, timestamp: new Date() });
      await document.save();
  
      res.json({
        message: "AI Response generated and saved successfully!",
        documentId: document._id,
        question,
        answer,
      });
    } catch (error) {
      console.error("❌ Error processing document question:", error);
      res.status(500).json({ error: "Failed to process document question!" });
    }
};

// ✅ Retrieve Chat History for a Document
export const getChatHistory:any = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      if (!req.user || !req.user.userId) {
        res.status(401).json({ error: "Unauthorized: No valid user found." });
        return;
      }
  
      const { documentId } = req.params;
      const userId = req.user.userId;
  
      // ✅ Ensure document exists and belongs to the authenticated user
      const document = await Document.findOne({ _id: documentId, userId });
  
      if (!document) {
        res.status(404).json({ error: "Document not found or access denied." });
        return;
      }
  
      res.json({
        message: "Chat history retrieved successfully!",
        documentId: document._id,
        chatHistory: document.chatHistory,
      });
    } catch (error) {
      console.error("❌ Error fetching chat history:", error);
      res.status(500).json({ error: "Failed to fetch chat history!" });
    }
};

// ✅ Generate or Retrieve Audio-Based Tutor for a Document
export const generateOrRetrieveAudioTutor:any = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user || !req.user.userId) {
      res.status(401).json({ error: "Unauthorized: No valid user found." });
      return;
    }

    const { documentId } = req.params;
    const userId = req.user.userId;

    // ✅ Fetch user details (age & interests)
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: "User not found!" });
      return;
    }

    const userAge = user.age || 18;
    const userInterests = user.interests?.length > 0 ? user.interests.join(", ") : "science and technology";

    console.log("🎤 Checking audio tutorial for:", { age: userAge, interests: userInterests });

    // ✅ Ensure the document belongs to the authenticated user
    const document = await Document.findOne({ _id: documentId, userId });

    if (!document) {
      res.status(404).json({ error: "Document not found or access denied." });
      return;
    }

    // ✅ If audio already exists, return the saved link
    if (document.audioUrl) {
      console.log("✅ Returning existing audio file:", document.audioUrl);
      res.json({
        message: "Audio tutorial already generated.",
        documentId: document._id,
        audioUrl: document.audioUrl,
      });
      return;
    }

    // ✅ Generate a fun, engaging explanation
    const explanation = await generateFunExplanation(document.text, userAge, userInterests);

    // ✅ Convert explanation into speech
    const audioUrl = await convertTextToSpeech(explanation, userId, documentId);

    // ✅ Save the generated audio link in the document
    document.audioUrl = audioUrl;
    await document.save();

    res.json({
      message: "Audio tutorial generated successfully!",
      documentId: document._id,
      audioUrl,
    });
  } catch (error) {
    console.error("❌ Error generating/retrieving audio tutor:", error);
    res.status(500).json({ error: "Failed to generate or retrieve audio tutor!" });
  }
};