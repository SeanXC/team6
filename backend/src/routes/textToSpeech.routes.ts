import express from "express";
import { textToSpeechHandler } from "../controllers/textToSpeech.controller";

const router = express.Router();

router.post("/tts-google", textToSpeechHandler);

export default router;
