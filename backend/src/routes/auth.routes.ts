import express from 'express';
import { googleSignIn } from '../controllers/auth.controller';

const router = express.Router();

// Google Sign-In Route
router.post('/google', googleSignIn);
router.post('/login', googleSignIn)
export default router;