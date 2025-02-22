import express from "express";
import { uploadDocument, getDocuments } from "../controllers/document.controller";
import upload from "../middleware/upload.middleware";
import { authenticate } from "../middleware/auth.middleware"; // Import authentication middleware

const router = express.Router();

// ✅ Upload and extract text from a document
router.post("/upload", authenticate, upload.single("file"), uploadDocument);

// ✅ Retrieve all documents for a user
router.get("/all",authenticate, getDocuments);

export default router;