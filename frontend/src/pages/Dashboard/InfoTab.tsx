import { User } from '@/types/user';
import InterestsList from './InterestsList';
import { useRef, useState } from 'react';

interface InfoTabProps {
    user: User;
}

function InfoTab({user}: InfoTabProps) {
	const [interestsList, setInterestsList] = useState(['programming', 'web development', 'item 3', 'programming', 'web development', 'item 3', 'programming', 'web development', 'item 3']);

	const inputRef = useRef<HTMLInputElement>(null);

	function removeItemFromList(item: string) {
		const indexToRemove = interestsList.indexOf(item);

		const listClone = [...interestsList];
		listClone.splice(indexToRemove, 1);

		setInterestsList(listClone);
	}

	function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		const text = inputRef.current?.value.trim();
		
		if (!text || !inputRef.current) {
			// do nothing if text box empty
			return;
		}

		if (e.key === 'Enter') {
			const listClone = [...interestsList];

			listClone.push(text);

			setInterestsList(listClone);

			inputRef.current.value = '';
		}
	}

	return (
		<div className="grow flex flex-col bg-gray-700 p-4 rounded-xl">
			<span className='text-3xl !font-semibold pb-4'>Hello, {user.name}</span>
			<span className='text-xl'>Any new interests?</span>
			<input onKeyDown={handleInputKeyDown} ref={inputRef} type="text" className='w-full bg-gray-800 p-2 rounded-xl mt-2' placeholder='If so, enter them here...' />
			<InterestsList list={interestsList} onRemoveItem={removeItemFromList} />
		</div>
	);
}

export default InfoTab;