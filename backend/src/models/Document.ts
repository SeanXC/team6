import mongoose, { Document, Schema } from "mongoose";

// ✅ Define Document Interface
export interface IDocument extends Document {
  userId: string; // Associate with the user who uploaded it
  filename: string;
  text: string;
  createdAt: Date;
}

// ✅ Create Document Schema
const DocumentSchema: Schema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // Associate with authenticated user
    filename: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IDocument>("Document", DocumentSchema);