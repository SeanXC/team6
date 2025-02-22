import { Request, Response } from 'express';
import User, { IUser } from '../models/User';

// ✅ Ensure `req.user` follows the `authenticate` middleware format
interface AuthenticatedRequest extends Request {
  user?: { userId: string };
}

// ✅ Update User Profile Controller
export const updateUserProfile:any = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    console.log("🔹 Incoming Request for Profile Update:", req.user); // Debug log

    if (!req.user || !req.user.userId) {
      res.status(401).json({ message: "Unauthorized: No user found in request." });
      return;
    }

    const { age, interests } = req.body;

    // **Validate input**
    if (!age || !Array.isArray(interests) || interests.length === 0) {
      res.status(400).json({ message: "Age and interests are required!" });
      return;
    }

    // ✅ Fetch user from DB and handle `undefined`
    const user: IUser | null = await User.findById(req.user.userId);

    if (!user) {
      res.status(404).json({ message: "User not found!" });
      return;
    }

    // ✅ Update the user profile
    user.age = age;
    user.interests = interests;
    await user.save();

    console.log("✅ User profile updated successfully:", user); // Debug log

    res.json({ message: "Profile updated successfully!", user });
  } catch (error) {
    console.error("❌ Error updating user profile:", error);
    res.status(500).json({ message: "Server error!" });
  }
};