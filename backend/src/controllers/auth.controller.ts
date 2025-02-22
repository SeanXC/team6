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

// **Google Login Controller**
export const googleSignIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.body;  // ✅ Expecting ID token from frontend

    if (!token) {
      res.status(400).json({ error: 'ID Token is required' });
      return;
    }

    // ✅ Verify Google ID token
    const ticket = await client.verifyIdToken({
      idToken: token,  // ✅ Expecting ID token here, NOT access token
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    console.log("✅ Google ID Token Payload:", payload);

    if (!payload) {
      res.status(400).json({ error: "Invalid Google ID Token" });
      return;
    }

    // Extract user information
    const { sub: googleId, name, email, picture } = payload;

    if (!googleId || !email || !name) {
      res.status(400).json({ error: "Google account is missing essential details." });
      return;
    }

    // ✅ Find or create the user
    let user: IUser | null = await User.findOne({ googleId });

    if (!user) {
      console.log("🔹 Creating new user...");

      user = new User({
        googleId,
        name,
        email,
        profilePicture: picture, // Optional, store profile image
        age: null,
        interests: [],
      });

      await user.save();
      console.log("✅ New user created successfully!");
    } else {
      console.log("✅ Existing user found, proceeding with authentication...");
    }

    // ✅ Generate JWT
    const jwtToken = generateJWT(user._id.toString());

    // ✅ Save JWT (optional)
    user.token = jwtToken;
    await user.save();

    // ✅ Send response to frontend
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