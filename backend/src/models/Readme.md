# 📂 Models

The models/ directory contains the Mongoose schemas for MongoDB, defining the structure of stored documents and users. These models facilitate database operations, ensuring data consistency and validation.

📌 Table of Contents
 • 📌 Document Model
 • 📌 User Model
 • 📌 Summary

📌 Document Model

File: Document.ts
This schema represents uploaded documents, storing extracted text, AI-generated summaries, chat history, and audio-based tutors.

```
🔹 Fields:

Field Type Description
userId string The ID of the user who uploaded the document.
filename string Original filename of the uploaded document.
text string Extracted text content from the document.
summary string AI-generated document summary.
chatHistory array Stores Q&A interactions with the document.
audioData Buffer Stores raw audio data (if using GridFS or MongoDB).
audioMimeType string Stores the MIME type of the audio (e.g., audio/mp3).
audioUrl string URL reference for the AI-generated audio tutor.
funTitle string AI-generated engaging title for the explanation.
funExplanation string AI-generated fun and relatable explanation.
createdAt Date Timestamp of document creation.
```

```
🔹 Schema Definition:

const DocumentSchema: Schema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    filename: { type: String, required: true },
    text: { type: String, required: true },
    summary: { type: String, default: '' },
    audioData: { type: Buffer },
    audioMimeType: { type: String },
    audioUrl: { type: String },
    funTitle: { type: String },
    funExplanation: { type: String },
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

🔹 Example Document Entry:

{
  "_id": "65abc12345f6de78ab90cd12",
  "userId": "654321abcdef1234567890ab",
  "filename": "research_paper.pdf",
  "text": "Quantum computing has the potential to revolutionize computation...",
  "summary": "Quantum computing enhances computational power...",
  "chatHistory": [
    {
      "question": "What is quantum computing?",
      "answer": "Quantum computing uses qubits to process data...",
      "timestamp": "2025-02-22T14:30:00Z"
    }
  ],
  "audioUrl": "/audio/audio_tutor_65abc12345.mp3",
  "funTitle": "Quantum Computing: The Future of Tech!",
  "funExplanation": "Imagine a detective solving cases with superposition...",
  "createdAt": "2025-02-22T14:20:00Z"
}
```

📌 User Model

File: User.ts
This schema represents registered users, primarily authenticated via Google OAuth.

```
🔹 Fields:

Field Type Description
_id ObjectId Unique identifier for the user.
googleId string Google OAuth ID.
name string User’s full name.
email string Email address (unique).
age number User’s age (optional).
interests array List of user interests.
token string JWT authentication token.
```

```
🔹 Schema Definition:

const UserSchema: Schema = new Schema({
  googleId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, default: null },
  interests: { type: [String], default: [] },
  token: { type: String },
}, { timestamps: true });

// Ensure email is properly indexed and required
UserSchema.path('email').validate(function (value: string) {
  return value && value.length > 0;
}, 'Email is required.');

🔹 Example User Entry:

{
  "_id": "654321abcdef1234567890ab",
  "googleId": "11673144338761620678",
  "name": "John Doe",
  "email": "<johndoe@gmail.com>",
  "age": 25,
  "interests": ["AI", "Machine Learning", "Space Exploration"],
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "createdAt": "2025-02-22T14:00:00Z"
}
```

📌 Summary

The models/ directory contains MongoDB schemas that define the data structure for:

 1. Documents: Stores text, summaries, chat history, and AI-generated audio.
 2. Users: Manages authentication, personal details, and preferences.

These models enable seamless database operations and ensure data integrity.
