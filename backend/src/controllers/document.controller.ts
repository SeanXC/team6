import { Request, Response } from "express";
import fs from "fs";
import pdfParse from "pdf-parse";
import Document from "../models/Document";
import { summarizeText } from "../services/ai.service";
import User from "../models/User";

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

    console.log("📂 File Uploaded:", req.file.path);

    // ✅ Read uploaded file
    const fileBuffer = fs.readFileSync(req.file.path);

    // ✅ Extract text from PDF
    const data = await pdfParse(fileBuffer);
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

    // ✅ Cleanup: Delete file after processing
    fs.unlinkSync(req.file.path);

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

// ✅ Summarize Document with User Interests & Age Context
export const summarizeDocument: any = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
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
  
      // Provide a default age if user.age is null, for example 30
      const userAge = user.age ?? 30;
      const userInterests = user.interests?.length > 0 ? user.interests.join(", ") : "various topics";
  
      console.log("🧑 User Details:", { age: userAge, interests: userInterests });
  
      // ✅ Ensure document belongs to the authenticated user
      const document = await Document.findOne({ _id: documentId, userId });
      if (!document) {
        res.status(404).json({ error: "Document not found or access denied." });
        return;
      }
  
      console.log("📄 Summarizing Document:", document.filename);
  
      // ✅ Summarize text using AI with user context
      const summary = await summarizeText(document.text, userAge, userInterests);
  
      res.json({
        message: "Document summarized successfully!",
        documentId: document._id,
        summary,
      });
    } catch (error) {
      console.error("❌ Error summarizing document:", error);
      res.status(500).json({ error: "Failed to summarize document!" });
    }
  };