interface AudioPlayerProps {
	filepath: string;
}

export default function AudioPlayer({filepath}: AudioPlayerProps) {
	return (
		<>
			<div className="w-full"></div>
			<audio src={filepath} controls={true}></audio>
		</>
	);
}