import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User, { IUser } from '../models/User';

dotenv.config();

// Function to generate JWT
const generateJWT = (userId: string): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  return jwt.sign({ userId }, secret, { expiresIn: '1h' });
};

// Google Sign-In Controller (Updated)
export const googleSignIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { googleId, name, email, picture } = req.body;

    if (!googleId || !email || !name) {
      res.status(400).json({ error: "Google account is missing essential details." });
      return;
    }

    // 🔹 Find or create user
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