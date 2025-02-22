import express from 'express';
import { updateUserProfile } from '../controllers/user.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

// ✅ Secure endpoint to update user profile
router.put('/update-profile', authenticate, updateUserProfile);

export default router; 