import express from "express";
import session from "express-session";
import passport from "passport";
//import connectDB from "./config/db";
import "./config/passport"; // Import passport config
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import textToSpeechRoutes from "./routes/textToSpeech.routes"; // Import TTS routes

dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(
    session({
        secret: process.env.SESSION_SECRET || "your_secret_key", // Use environment variable for security
        resave: false,
        saveUninitialized: false,
    })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Database Connection
//connectDB();

// Routes
app.get("/", (req, res) => {
    res.send("🚀 ConvoCraft Backend is Running 🚀");
});

// Authentication Routes
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/api", textToSpeechRoutes); // Add TTS route

// Google OAuth Routes
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        res.redirect("/dashboard"); // Adjust based on frontend
    }
);

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
