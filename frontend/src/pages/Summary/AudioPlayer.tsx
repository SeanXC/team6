// AudioPlayer.tsx
import React from 'react';

interface AudioPlayerProps {
  filepath: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ filepath }) => {
  return (
    <audio controls src={filepath} />
  );
};

export default AudioPlayer;