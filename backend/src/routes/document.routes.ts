import express from "express";
import { uploadDocument, 
    getDocuments,
    summarizeDocument,
    getChatHistory,
    chatWithDocument,
    getSingleSummarizedDocument,
    getSummarizedDocuments,
    generateOrRetrieveAudioTutor
} from "../controllers/document.controller";
import upload from "../middleware/upload.middleware";
import { authenticate } from "../middleware/auth.middleware"; // Import authentication middleware

const router = express.Router();

// ✅ Upload and extract text from a document
router.post("/upload", authenticate, upload.single("file"), uploadDocument);

// ✅ Retrieve all documents for a user
router.get("/all",authenticate, getDocuments);

// ✅ Summarize a specific document
router.get("/summarize/:documentId", authenticate, summarizeDocument);

// ✅ Retrieve only documents that have summaries
router.get("/summarized", authenticate, getSummarizedDocuments);

// ✅ Retrieve a single summarized document
router.get("/summarized/:documentId", authenticate, getSingleSummarizedDocument);


// ✅ Ask questions about a document
router.post("/chat/:documentId", authenticate, chatWithDocument);

// ✅ Retrieve chat history for a document
router.get("/chat/history/:documentId", authenticate, getChatHistory);

// ✅ Retrieve or generate an audio tutor for a document
router.get("/audio-tutor/:documentId", authenticate, generateOrRetrieveAudioTutor);

export default router;