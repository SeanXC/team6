import { User } from '@/types/user';
import InterestsList from './InterestsList';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { IoMdArrowRoundForward } from 'react-icons/io';
import sendAuthedAxios from '@/utils/sendAuthedAxios';
import useAuthenticated from '@/hooks/useAuthenticated';

function InfoTab() {
	const navigate = useNavigate();
	const storedUser = localStorage.getItem('user');
	const user: User = storedUser ? JSON.parse(storedUser) : null;
	const [interestsList, setInterestsList] = useState<string[]>(user.interests ?? []);
	const token = useAuthenticated({navToLoginOnUnauthed: false});

	const [input, setInput] = useState<string>('');

	/**
	 * Remove Item From Interest List
	 * @param item 
	 */
	function removeItemFromList(item: string) {
		const indexToRemove = interestsList.indexOf(item);

		const listClone = [...interestsList];
		listClone.splice(indexToRemove, 1);

		setInterestsList(listClone);

		sendUpdatedInterestsList(listClone);
	}

	/**
	 * Update Users interest 
	 * @param list 
	 */
	async function sendUpdatedInterestsList(list: string[]) {
		try {
			const age = user.age;

			const res = await sendAuthedAxios('/user/update-profile', {
				data: { age, interests: list },
				method: 'PUT'
			}, token);
	
			console.log('✅ Profile Updated:', res.data);
		
			// ✅ Update user in localStorage
			localStorage.setItem('user', JSON.stringify(res.data.user));
		
			// ✅ Redirect to Dashboard
			navigate('/dashboard');
		} catch (error) {
			console.error('❌ Profile Update Error:', error);
		}
	}

	/**
	 * Handle "Enter" input when adding interest
	 * @param e 
	 * @returns 
	 */
	async function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (!input) {
			// do nothing if text box empty
			return;
		}

		if (e.key === 'Enter') {
			addInterest();
		}
	}

	// Add Interest to State
	const addInterest = () => {
		const listClone = [...interestsList];

		listClone.push(input);

		setInterestsList(listClone);

		sendUpdatedInterestsList(listClone);

		setInput('');
	};

	return (
		<div className="flex flex-col bg-gray-700 p-4 rounded-xl">
			<span className='text-3xl !font-semibold pb-4'>Hello, {user.name}</span>
			<span className='text-xl'>Any new interests?</span>
			<div className='relative'>
				<input onKeyDown={handleInputKeyDown} value={input} onChange={e => setInput(e.target.value)} type="text" className='w-full bg-gray-800 p-2 rounded-xl mt-2' placeholder='If so, enter them here...' />
				<button className='absolute right-0 bottom-0 py-2 px-2 cursor-pointer' onClick={addInterest}><IoMdArrowRoundForward className='h-full w-6 hover:text-gray-400' /></button>
			</div>
			<InterestsList list={interestsList} onRemoveItem={removeItemFromList} />
		</div>
	);
}

export default InfoTab;