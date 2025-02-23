import Markdown from 'marked-react';

interface ExplanationTextProps {
    text: string;
}

function ExplanationText({text}: ExplanationTextProps) {
	const paragraphs = text.split('\n\n');

	const paragraphsRendered = paragraphs.map((paragraph) => {
		return <Markdown>{paragraph}</Markdown>;
	});
    
	return paragraphsRendered;
}

export default ExplanationText;