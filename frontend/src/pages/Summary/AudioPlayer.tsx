import React, { useState } from "react";
import axios from "axios";

interface AudioPlayerProps {
  documentId: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ documentId }) => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateAudio = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token"); // ✅ Get auth token
      if (!token) {
        setError("Authentication required.");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `https://team6-production.up.railway.app/audio-tutor/${documentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("🎤 Audio Generation Response:", response.data);
      setAudioUrl(response.data.audioUrl);
    } catch (err) {
      console.error("❌ Error generating audio:", err);
      setError("Failed to generate audio.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-700 p-4 rounded-xl text-center">
      <h2 className="text-lg font-semibold text-white mb-3">
        Generate Audio Tutor
      </h2>
      <button
        onClick={handleGenerateAudio}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Audio"}
      </button>

      {error && <p className="text-red-400 mt-3">{error}</p>}

      {audioUrl && (
        <div className="mt-4">
          <AudioPlayer filepath={audioUrl} />
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;