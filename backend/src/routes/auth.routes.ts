import express from 'express';
import { googleSignIn } from '../controllers/auth.controller';
import cors from "cors";
import passport from "passport";

const router = express.Router();

// Google Sign-In Route
router.post('/google', googleSignIn);
router.post('/login', googleSignIn)

// ✅ Google OAuth callback route
router.get(
    "/google/callback",
    cors(), // Allow CORS on this route
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
      res.redirect("http://localhost:5173/dashboard"); // Redirect user to frontend after login
    })
export default router;