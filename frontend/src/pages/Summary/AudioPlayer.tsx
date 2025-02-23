// AudioPlayer.tsx
import React from 'react';

const BACKEND_URL = 'https://team6-production.up.railway.app';

interface AudioPlayerProps {
  filepath: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ filepath }) => {
  // If the filepath is not an absolute URL, prepend the backend URL
  const audioSrc = filepath.startsWith('http') ? filepath : `${BACKEND_URL}${filepath}`;

  return (
    <audio controls src={audioSrc} />
  );
};

export default AudioPlayer;