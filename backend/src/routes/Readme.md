# 📂 Routes

The routes/ directory contains Express.js route definitions for handling user authentication, document processing, AI-generated explanations, and user profile management. These routes serve as the entry points for interacting with the backend.

📌 Table of Contents
 • 📌 Authentication Routes
 • 📌 Document Routes
 • 📌 User Routes
 • 📌 Summary

📌 Authentication Routes

File: auth.routes.ts
Handles Google OAuth authentication and user sign-in.

```
🔹 Routes:

Method Endpoint Description
POST /auth/google Handles Google OAuth login.
POST /auth/login Alternative endpoint for Google login.
GET /auth/google/callback OAuth callback that redirects users to the frontend after authentication.
```

```
🔹 Example Usage:

🔹 Google Sign-In

POST /auth/google
Content-Type: application/json

{
  "googleId": "11673144338761620678",
  "name": "John Doe",
  "email": "<johndoe@gmail.com>",
  "picture": "<https://example.com/johndoe.jpg>"
}

🔹 OAuth Redirect

GET /auth/google/callback

✅ Redirects the authenticated user to:
<http://localhost:5173/dashboard>

📌 Document Routes

File: document.routes.ts
Handles document uploads, text extraction, AI processing, summaries, chat-based Q&A, and AI-generated audio explanations.
```

🔹 Routes:

```
Method Endpoint Description
POST /document/upload Upload and process a PDF document.
GET /document/all Retrieve all user-uploaded documents.
GET /document/summarize/:documentId Summarize a specific document.
GET /document/summarized Retrieve only summarized documents.
GET /document/summarized/:documentId Retrieve a single summarized document.
POST /document/chat/:documentId Ask AI questions about a document.
GET /document/chat/history/:documentId Retrieve chat history for a document.
GET /document/audio-tutor/:documentId Retrieve or generate an AI-based audio tutor.
GET /document/explanation/:documentId Generate a fun explanation for the document.
DELETE /document/delete/:documentId Delete a document and its associated data.
```

```
🔹 Example Usage:

🔹 Upload a Document

POST /document/upload
Authorization: Bearer <your_token>
Content-Type: multipart/form-data

file: <PDF document>

🔹 Summarize a Document

GET /document/summarize/65abc12345f6de78ab90cd12
Authorization: Bearer <your_token>

✅ Returns:

{
  "message": "Document summarized successfully!",
  "summary": "Quantum computing enhances computational power..."
}

🔹 Generate an AI-Based Audio Tutor

GET /document/audio-tutor/65abc12345f6de78ab90cd12
Authorization: Bearer <your_token>

✅ Returns:

{
  "message": "Audio tutorial generated successfully!",
  "audioUrl": "/audio/audio_tutor_65abc12345.mp3"
}

📌 User Routes

File: user.routes.ts
Handles user profile updates.
```

```
🔹 Routes:

Method Endpoint Description
PUT /user/update-profile Update user profile (age & interests).

🔹 Example Usage:

🔹 Update Profile

PUT /user/update-profile
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "age": 25,
  "interests": ["AI", "Machine Learning", "Space Exploration"]
}

✅ Returns:

{
  "message": "Profile updated successfully!",
  "user": {
    "age": 25,
    "interests": ["AI", "Machine Learning", "Space Exploration"]
  }
}
```

📌 Summary

The routes/ directory defines all backend API endpoints, structured as follows:

 1. Authentication Routes (auth.routes.ts): Handles user login via Google OAuth.
 2. Document Routes (document.routes.ts): Manages document uploads, AI summaries, chat, and audio processing.
 3. User Routes (user.routes.ts): Handles user profile updates.
