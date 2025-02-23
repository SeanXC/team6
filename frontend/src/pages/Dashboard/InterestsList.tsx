import { IoMdClose } from 'react-icons/io';

interface InterestsListProps {
	list: string[];
	onRemoveItem: (item: string) => void
}

function InterestsList({list, onRemoveItem}: InterestsListProps) {
	const renderedList = list.map((item, index) => {
		return <div key={index} className="border-[1px] border-white p-2 w-fit rounded-xl flex flex-row items-center gap-2"><span>{item}</span><IoMdClose className="cursor-pointer h-6 w-6 hover:text-red-400 transition-colors duration-150" onClick={() => onRemoveItem(item)} /></div>;
	});

	return <div className="flex flex-row flex-wrap gap-4 mt-4">
		{renderedList}
	</div>;
}

export default InterestsList;