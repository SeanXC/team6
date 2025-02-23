# 📂 Controllers

The controllers/ directory contains the main business logic for handling authentication, document processing, user interactions, and AI-powered functionalities. These controllers process API requests, interact with the database, and manage responses.

📌 Table of Contents
 • 📌 Authentication Controller
 • 📌 User Controller
 • 📌 Document Controller
 • 📌 AI Services Controller

📌 Authentication Controller

File: auth.controller.ts
Handles user authentication via Google Sign-In and generates JWT tokens.

🔹 Key Functions:
 • googleSignIn(req, res):
 • Authenticates users with Google credentials.
 • Creates a new user if they do not exist.
 • Generates and returns a JWT token.

🛠️ Example API Endpoints:

POST /auth/google

📥 Request Body:

{
  "googleId": "1234567890",
  "name": "John Doe",
  "email": "<john@example.com>",
  "picture": "<https://example.com/john.jpg>"
}

📤 Response:

{
  "user": { "name": "John Doe", "email": "<john@example.com>" },
  "token": "eyJhbGciOi..."
}

📌 User Controller

File: user.controller.ts
Handles user profile updates.

🔹 Key Functions:
 • updateUserProfile(req, res):
 • Updates the user’s age and interests.

🛠️ Example API Endpoint:

PUT /user/update-profile

📥 Request Body:

{
  "age": 25,
  "interests": ["technology", "music", "AI"]
}

📤 Response:

{
  "message": "Profile updated successfully!"
}

📌 Document Controller

File: document.controller.ts
Handles PDF document uploads, text extraction, summarization, and retrieval.

🔹 Key Functions:
 • uploadDocument(req, res):
 • Extracts text from an uploaded PDF and saves it to the database.
 • Calls AI to generate a summary.
 • getDocuments(req, res):
 • Retrieves all documents uploaded by the user.
 • summarizeDocument(req, res):
 • Generates a summary for a document if it doesn’t exist.
 • deleteDocument(req, res):
 • Deletes a document along with its associated data.

🛠️ Example API Endpoints:

POST /document/upload
GET /document/all
GET /document/summarize/:documentId
DELETE /document/:documentId

📤 Example Response for Summarization:

{
  "message": "Document summarized successfully!",
  "summary": "This document discusses AI and its impact on modern computing..."
}

📌 AI Services Controller

File: ai.controller.ts
Manages AI-powered functionalities, including chat-based Q&A, fun explanations, and text-to-speech conversion.

🔹 Key Functions:
 • generateFunExplanationAPI(req, res):
 • Generates a fun and engaging AI-powered explanation for a document.
 • generateOrRetrieveAudioTutor(req, res):
 • Converts the explanation into an audio file and returns the URL.

🛠️ Example API Endpoints:

GET /document/explanation/:documentId
GET /document/audio-tutor/:documentId

📤 Example Response for AI Explanation:

{
  "message": "Fun explanation generated successfully!",
  "title": "Quantum Computing is Like Magic!",
  "explanation": "Imagine you're a detective solving puzzles, but in quantum space..."
}

📤 Example Response for Audio Generation:

{
  "message": "Audio tutorial generated successfully!",
  "audioUrl": "/audio/audio_tutor_67ba54106e97f356147235b8.mp3"
}

📌 Summary

The controllers/ directory is the core logic layer of the application, enabling authentication, document processing, AI-driven interactions, and user profile management.

✅ Next Step: If modifications are needed, update the controllers and ensure they align with the API documentation.

💡 Notes:
 • Ensure .env contains JWT_SECRET and OPENAI_API_KEY for authentication and AI services.
 • This project follows RESTful API design principles for structured data flow.
 • The MongoDB database is used for storing user profiles, documents, and chat history.
