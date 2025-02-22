import express from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import connectDB from "./config/db";
import "./config/passport"; // Ensure Passport is configured before use
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import documentRoutes from "./routes/document.routes";

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
        secret: process.env.JWT_SECRET || 'default-secret', // Provide a default value
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production', // Set to true in production if using HTTPS
            httpOnly: true,
        },
    })
);

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

// ✅ Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
