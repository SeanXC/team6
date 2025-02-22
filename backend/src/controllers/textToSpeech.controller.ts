import textToSpeech, { protos } from "@google-cloud/text-to-speech"; // ✅ Import Google's API types
import fs from "fs";
import util from "util";
import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

// ✅ Initialize Google Cloud TTS Client
const client = new textToSpeech.TextToSpeechClient();

export const textToSpeechHandler = async (req: Request, res: Response) => {
    try {
        const { text, voice = "en-US-Wavenet-D" } = req.body;

        // ✅ Define request type explicitly
        const request: protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest = {
            input: { text },
            voice: { languageCode: "en-US", name: voice },
            audioConfig: { audioEncoding: protos.google.cloud.texttospeech.v1.AudioEncoding.MP3 },
        };

        // ✅ Fix: Correctly handle API response
        const response = await client.synthesizeSpeech(request);
        const audioResponse = response[0]; // ✅ Only extract the first element

        if (!audioResponse.audioContent) {
            throw new Error("No audio content returned from TTS API");
        }

        const writeFile = util.promisify(fs.writeFile);
        await writeFile("output.mp3", audioResponse.audioContent as Buffer, "binary");

        // ✅ Send the audio file to frontend
        res.download("output.mp3");
    } catch (error) {
        console.error("TTS Error:", error);
        res.status(500).json({ error: "Text-to-Speech failed" });
    }
};
