import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import User, { IUser } from '../models/User';

dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Function to generate JWT
const generateJWT = (userId: string): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  return jwt.sign({ userId }, secret, { expiresIn: '1h' });
};

// Google Login Controller
export const googleSignIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.body.token;
    if (!token) {
      res.status(400).json({ error: 'Token is required' });
      return;
    }

    // Verify Google ID token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    console.log("Google ID Token Payload:", payload); // Debugging log

    if (!payload) {
      res.status(400).json({ error: "Invalid token received from Google" });
      return;
    }

    // Extract user information
    const googleId = payload.sub;
    const name = payload.name || "Unknown User";
    const email = payload.email || null;

    console.log("Extracted Data - Google ID:", googleId, "Email:", email, "Name:", name);

    // Ensure required fields are present
    if (!googleId || !name) {
      res.status(400).json({ error: "Google account is missing essential details." });
      return;
    }

    if (!email) {
      res.status(400).json({ error: "Google account does not have an email. Please use another account." });
      return;
    }

    // Find existing user
    let user: IUser | null = await User.findOne({ googleId });

    if (!user) {
      console.log("No existing user found. Creating a new user...");

      // Create a new user if not exists
      user = new User({
        googleId,
        name,
        email, // Ensure email is always present
        age: null, // Prompt user to complete profile later
        interests: [],
      });

      await user.save();
      console.log("New user created successfully!");
    } else {
      console.log("User found, proceeding with authentication...");
    }

    // Generate JWT
    const jwtToken = generateJWT(user._id!.toString());

    // Store JWT in user record (optional)
    user.token = jwtToken;
    await user.save();

    // Send token to frontend
    
    // Send token and user data to frontend
    res.status(200).json({ 
        user, 
        token: jwtToken, 
        profileComplete: user.age !== null && user.interests.length > 0 
    });
  } catch (error) {
    console.error('❌ Error during Google Sign-In:', error);
    res.status(500).json({ error: 'Authentication failed. Please try again.' });
  }
};