export interface UploadedDoc {
	userId: string; // Associate with the user who uploaded it
	filename: string;
	text: string;
	summary?: string;
	chatHistory: IChatEntry[];
	audioData?: Buffer;
	audioMimeType?: string;
	audioUrl?: string;
	funTitle?: string; 
	funExplanation?: string;
	createdAt: Date;
};