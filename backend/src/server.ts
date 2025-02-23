import express from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import connectDB from "./config/db";
import "./config/passport"; // Ensure Passport is configured before use
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import documentRoutes from "./routes/document.routes";
import cors from "cors";

import fs from "fs";
import path from "path";
import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";


// ✅ Load environment variables
dotenv.config();

// ✅ Initialize Express
const app = express();

// ✅ Connect to Database
connectDB();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://team6-production.up.railway.app/", 'https://t6-convocraft.vercel.app'], // Allow frontend domains
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow cookies & authentication headers
  })
);
// ✅ Middleware Configuration
app.use(express.json());
app.use(
    session({
        secret: process.env.JWT_SECRET || 'default-secret', // Provide a default value
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production', // Set to true in production if using HTTPS
            httpOnly: true,
        },
    })
);
app.get("/audio/stream/:fileId", async (req, res) => {
  try {
    const fileId = new mongoose.Types.ObjectId(req.params.fileId);
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error("Database connection is not ready.");
    }
    const bucket = new GridFSBucket(db, { bucketName: "audio" });
    res.set("Content-Type", "audio/mpeg");
    bucket.openDownloadStream(fileId).pipe(res);
  } catch (error) {
    console.error("❌ Error streaming audio:", error);
    res.status(404).json({ error: "Audio not found" });
  }
});
// ✅ Initialize Passport (AFTER session middleware)
app.use(passport.initialize());
app.use(passport.session());

// ✅ Register Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/document", documentRoutes);

// ✅ Default Route
app.get("/", (req, res) => {
  res.send("🚀 ConvoCraft Backend is Running");
});

// ✅ Google OAuth Routes
app.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }));
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard"); // Change this for frontend integration
  }
);
// ✅ Ensure the `uploads/` directory exists on startup
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("📂 Created 'uploads' directory.");
}
// ✅ Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
