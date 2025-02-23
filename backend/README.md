# 🛠️ Backend - AI-Powered Document Processing API

📌 Overview

This backend powers an AI-driven document processing and interactive learning platform, enabling users to:
 • Upload PDF documents and extract text.
 • Generate AI-based summaries with personalized insights.
 • Ask AI-powered questions about documents.
 • Convert document explanations into AI-generated speech.
 • Store and retrieve audio using MongoDB GridFS.
 • Manage user profiles and authentication.

Built with Node.js, Express, TypeScript, MongoDB, and OpenAI API, the backend provides secure, scalable, and intelligent document interactions.

🚀 Features

🔹 User Authentication
 • Google OAuth sign-in.
 • JWT-based authentication.

🔹 Document Upload & Processing
 • Extract text from PDF documents.
 • Store documents in MongoDB.
 • Generate AI-powered summaries.
 • Retrieve and manage documents.

🔹 AI-Powered Learning
 • Ask AI-powered questions based on document content.
 • Generate fun, engaging explanations tailored to user preferences.
 • Create AI-generated speech from explanations.

🔹 Audio Streaming with GridFS
 • Convert AI explanations into high-quality AI-generated speech.
 • Store audio files in MongoDB GridFS.
 • Stream audio through REST API endpoints.

```
🏗️ Project Structure

backend/
│── node_modules/          # Dependencies
│── public/                # Static assets (e.g., audio files)
│── src/                   # Main source code
│   ├── config/            # Database & server configuration
│   ├── controllers/       # API controllers for handling logic
│   ├── middleware/        # Authentication & request handling middleware
│   ├── models/            # Mongoose database models
│   ├── routes/            # API route definitions
│   ├── services/          # AI & processing services (OpenAI, MongoDB, etc.)
│   ├── server.ts          # Entry point for the backend server
│── uploads/               # Temporary storage for uploaded files
│── .env                   # Environment variables
│── Dockerfile             # Containerization setup
│── package.json           # Dependencies and scripts
│── README.md              # Documentation
│── tsconfig.json          # TypeScript configuration
```

⚙️ Setup & Installation

1️⃣ Prerequisites

Ensure you have the following installed:
 • Node.js v18+
 • MongoDB (local or Atlas)
 • Docker (optional, for containerization)

2️⃣ Clone the repository

```
git clone <https://github.com/your-repo/backend.git>
cd backend
```

3️⃣ Install dependencies

```
npm install
```

4️⃣ Configure Environment Variables

Create a .env file in the root directory:

PORT=5001
MONGO_URI=mongodb+srv://your_mongodb_uri
OPENAI_API_KEY=your_openai_api_key
JWT_SECRET=your_jwt_secret

5️⃣ Start the server

Development Mode (Nodemon)

```
npm run dev
```

Production Mode

```
npm start
```

```
🛠️ API Endpoints

🔹 Authentication

Method Endpoint Description
POST /auth/google Google OAuth sign-in

🔹 Document Management

Method Endpoint Description
POST /document/upload Upload & extract text from PDF
GET /document/all Retrieve all user documents
GET /document/summarize/:documentId Generate summary for a document
DELETE /document/delete/:documentId Delete a document

🔹 AI-Powered Learning

Method Endpoint Description
POST /document/chat/:documentId Ask AI questions based on document
GET /document/chat/history/:documentId Retrieve document Q&A history
GET /document/explanation/:documentId Generate a fun explanation
GET /document/audio-tutor/:documentId Generate or retrieve AI-generated audio
```

📦 Deployment

🔹 Docker Setup

To deploy using Docker:

docker build -t backend-ai .
docker run -p 5001:5001 backend-ai

🔹 Deploy on Railway/Vercel
 • Configure MongoDB and OpenAI API keys in Railway/Vercel environment variables.
 • Deploy using CI/CD pipelines.

```
🛠️ Tech Stack

Technology Usage
Node.js + Express Backend framework
MongoDB + Mongoose Database for storing documents & user data
OpenAI API AI-powered text processing
JWT + Google OAuth Secure authentication
Multer File handling (PDF uploads)
GridFS (MongoDB) Audio file storage & streaming
```

📌 Future Improvements

✅ Real-time AI chat interface
✅ Support for multiple file formats (DOCX, TXT, etc.)
✅ Enhanced AI model customization
