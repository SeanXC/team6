import express from "express";
import session from "express-session";
import passport from "passport";
<<<<<<< HEAD
//import connectDB from "./config/db";
import "./config/passport"; // Import passport config
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import textToSpeechRoutes from "./routes/textToSpeech.routes"; // Import TTS routes
=======
import dotenv from "dotenv";
import connectDB from "./config/db";
import "./config/passport"; // Ensure Passport is configured before use
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import documentRoutes from "./routes/document.routes";
>>>>>>> main

// ✅ Load environment variables
dotenv.config();

// ✅ Initialize Express
const app = express();

// ✅ Connect to Database
connectDB();

// ✅ Middleware Configuration
app.use(express.json());
app.use(
    session({
<<<<<<< HEAD
        secret: process.env.SESSION_SECRET || "your_secret_key", // Use environment variable for security
=======
        secret: process.env.JWT_SECRET || 'default-secret', // Provide a default value
>>>>>>> main
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production', // Set to true in production if using HTTPS
            httpOnly: true,
        },
    })
);

<<<<<<< HEAD
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
=======
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
>>>>>>> main
);

// ✅ Start Server
const PORT = process.env.PORT || 5001;
<<<<<<< HEAD
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
=======
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
>>>>>>> main
