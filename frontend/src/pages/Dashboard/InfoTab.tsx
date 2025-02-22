import { User } from '@/types/user';
import InterestsList from './InterestsList';
import { useState } from 'react';

interface InfoTabProps {
    user: User;
}

function InfoTab({user}: InfoTabProps) {
	const [interestsList, setInterestsList] = useState(['programming', 'web development', 'item 3', 'programming', 'web development', 'item 3', 'programming', 'web development', 'item 3']);

	return (
		<div className="grow flex flex-col bg-gray-700 p-4 rounded-xl">
			<span className='text-3xl !font-semibold pb-4'>Hello, {user.name}</span>
			<span className='text-xl'>Any new interests?</span>
			<input type="text" className='w-full bg-gray-800 p-2 rounded-xl mt-2' placeholder='If so, enter them here...' />
			<InterestsList list={interestsList} />
		</div>
	);
}

export default InfoTab;