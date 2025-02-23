# 📂 Services

The services/ directory contains core AI and processing utilities that handle various AI-powered functionalities such as text summarization, document Q&A, AI-generated explanations, and text-to-speech (TTS) conversion. These services interact with OpenAI’s API and MongoDB GridFS for data storage and retrieval.

📌 Table of Contents
 • 🔹 AI Summarization Service
 • 🔹 AI Question Answering Service
 • 🔹 AI Explanation Generator
 • 🔹 AI Text-to-Speech Service
 • 📌 Summary

🔹 AI Summarization Service

Function: summarizeText()
Description: This function uses OpenAI to generate a personalized summary with a fun fact related to the user’s interests.

🔹 How It Works:
 • The user’s age and interests are passed to OpenAI.
 • OpenAI extracts a fun and concise summary from the document.
 • The response is returned and stored in MongoDB.

🔹 Example Usage:

const summary = await summarizeText("Quantum computing is the future...", 25, "Machine Learning, AI");
console.log(summary);

🔹 Sample Response:

"Quantum computing enhances computational power exponentially. Fun Fact: Machine learning algorithms can leverage quantum mechanics to solve complex problems faster!"

🔹 AI Question Answering Service

Function: askDocumentQuestion()
Description: This service answers user questions based on the contents of an uploaded document.

🔹 How It Works:
 • The document text is fed into OpenAI.
 • The user’s question is processed, and AI generates a relevant response.

🔹 Example Usage:

const answer = await askDocumentQuestion("Quantum computing basics...", "What is a qubit?");
console.log(answer);

🔹 Sample Response:

"A qubit is the basic unit of quantum information, similar to a classical bit but capable of existing in multiple states at once."

🔹 AI Explanation Generator

Function: generateFunExplanation()
Description: This function creates engaging, user-friendly explanations using fun analogies and storytelling.

🔹 How It Works:
 • The function analyzes the document content.
 • AI translates complex information into engaging, story-driven explanations.
 • The output is saved in MongoDB and can be retrieved later.

🔹 Example Usage:

const funExplanation = await generateFunExplanation("Einstein's theory of relativity...", 20, "Space, Physics");
console.log(funExplanation);

🔹 Sample Response:

"Imagine you’re on a spaceship traveling near the speed of light. According to Einstein, time slows down for you compared to people on Earth. That’s relativity in action!"

🔹 AI Text-to-Speech Service

Function: convertTextToSpeech()
Description: Converts AI-generated explanations into speech and stores them using MongoDB GridFS.

🔹 How It Works:

 1. The generated explanation is passed to OpenAI’s TTS model.
 2. The AI voice synthesizes the explanation in a human-like voice.
 3. The audio file is stored in MongoDB GridFS for easy retrieval.
 4. A streaming endpoint (/audio/stream/:id) is provided to fetch the audio.

🔹 Example Usage:

const audioUrl = await convertTextToSpeech("Quantum computing is fascinating...", "1234", "5678");
console.log(audioUrl);

🔹 Sample Response:

"/audio/stream/65bcde78901234f6abcd1234"

✅ The audio can now be streamed directly in the frontend.

📌 Summary

The services/ directory contains core AI utilities for:

 1. Summarizing documents (summarizeText)
 2. Answering document-based questions (askDocumentQuestion)
 3. Generating fun AI explanations (generateFunExplanation)
 4. Converting explanations into AI-generated speech (convertTextToSpeech)
