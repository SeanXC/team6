interface ExplanationTextProps {
    text: string;
}

function ExplanationText({text}: ExplanationTextProps) {
	const paragraphs = text.split('\n\n');

	const paragraphsRendered = paragraphs.map((paragraph) => {
		return <p className="pb-4">{paragraph}</p>;
	});
    
	return paragraphsRendered;
}

export default ExplanationText;