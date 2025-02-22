interface InterestsListProps {
	list: string[];
}

function InterestsList({list}: InterestsListProps) {
	const renderedList = list.map((item) => {
		return <div className="border-[1px] border-white p-2 w-fit rounded-xl">{item}</div>;
	});

	return <div className="flex flex-row flex-wrap gap-2 my-4">
		{renderedList}
	</div>;
}

export default InterestsList;