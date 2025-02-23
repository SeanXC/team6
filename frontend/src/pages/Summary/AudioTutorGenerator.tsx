// AudioTutorGenerator.tsx
import React, { useState } from 'react';
import AudioPlayer from './AudioPlayer';
import useAuthenticated from '@/hooks/useAuthenticated';
import sendAuthedAxios from '@/utils/sendAuthedAxios';

interface AudioTutorGeneratorProps {
	documentId: string;
}

const AudioTutorGenerator: React.FC<AudioTutorGeneratorProps> = ({ documentId }) => {
	const [audioUrl, setAudioUrl] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const token = useAuthenticated({navToLoginOnUnauthed: true});

	// API call generate audio
	const handleGenerateAudio = async () => {
		setLoading(true);
		setError(null);

		try {
			const response = await sendAuthedAxios(`/document/audio-tutor/${documentId}`, { method: 'GET' }, token);

			console.log('🎤 Audio Generation Response:', response.data);
			setAudioUrl(response.data.audioUrl);
		} catch (err) {
			console.error('❌ Error generating audio:', err);
			setError('Failed to generate audio.');
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
				className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
				disabled={loading}
			>
				{loading ? 'Generating...' : 'Generate Audio'}
			</button>

			{error && <p className="text-red-400 mt-3">{error}</p>}

			{/* Only show AudioPlayer if we have an audioUrl */}
			{audioUrl && (
				<div className="flex justify-center mt-4">
					<AudioPlayer filepath={audioUrl} />
				</div>
			)}
		</div>
	);
};

export default AudioTutorGenerator;