import express from 'express';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import connectDB from './config/db';
import './config/passport';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { GridFSBucket } from 'mongodb';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import documentRoutes from './routes/document.routes';

dotenv.config();

const app = express();

// Connect DB
connectDB();

// CORS
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://team6-production.up.railway.app/',
      'https://t6-convocraft.vercel.app'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  })
);

// Middleware
app.use(express.json());
app.use(
  session({
    secret: process.env.JWT_SECRET || 'default-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true
    }
  })
);

// Audio streaming route (as in your example)
app.get('/audio/stream/:fileId', async (req, res) => {
  try {
    const fileId = new mongoose.Types.ObjectId(req.params.fileId);
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection is not ready.');
    }
    const bucket = new GridFSBucket(db, { bucketName: 'audio' });
    res.set('Content-Type', 'audio/mpeg');
    bucket.openDownloadStream(fileId).pipe(res);
  } catch (error) {
    console.error('❌ Error streaming audio:', error);
    res.status(404).json({ error: 'Audio not found' });
  }
});

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/document', documentRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('🚀 ConvoCraft Backend is Running');
});

// Ensure `uploads/` exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("📂 Created 'uploads' directory.");
}

// Export the Express app WITHOUT starting the server
export default app;