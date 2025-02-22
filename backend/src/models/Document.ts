import mongoose, { Document, Schema } from "mongoose";

// ✅ Define Document Interface
export interface IDocument extends Document {
  userId: string; // Associate with the user who uploaded it
  filename: string;
  text: string;
  summary?: string;
  chatHistory: IChatEntry[];
  createdAt: Date;
}

// ✅ Define Chat Entry Interface
interface IChatEntry {
    question: string;
    answer: string;
    timestamp: Date;
    
}

// ✅ Create Document Schema
const DocumentSchema: Schema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // Associate with authenticated user
    filename: { type: String, required: true },
    summary: { type: String, default: '' },
    text: { type: String, required: true },
    chatHistory: [
        {
          question: { type: String, required: true },
          answer: { type: String, required: true },
          timestamp: { type: Date, default: Date.now },
        },
      ],
  },
  { timestamps: true }
);

export default mongoose.model<IDocument>("Document", DocumentSchema);