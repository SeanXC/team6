import { User } from '@/types/user';
import InterestsList from './InterestsList';
import { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

function InfoTab() {
	const navigate = useNavigate();
	const storedUser = localStorage.getItem("user");
	const user: User = storedUser ? JSON.parse(storedUser) : null;
	const [interestsList, setInterestsList] = useState<string[]>(user.interests ?? []);

	const inputRef = useRef<HTMLInputElement>(null);

	function removeItemFromList(item: string) {
		const indexToRemove = interestsList.indexOf(item);

		const listClone = [...interestsList];
		listClone.splice(indexToRemove, 1);

		setInterestsList(listClone);

		sendUpdatedInterestsList(listClone);
	}

	async function sendUpdatedInterestsList(list: string[]) {
		try {
			const age = user.age;
			const res = await axios.put("https://team6-production.up.railway.app/user/update-profile", { age, interests: list },
				{
					headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // ✅ Send auth token in headers
				}
			);
	
			console.log("✅ Profile Updated:", res.data);
		
			// ✅ Update user in localStorage
			localStorage.setItem("user", JSON.stringify(res.data.user));
		
			// ✅ Redirect to Dashboard
			navigate("/dashboard");
		} catch (error) {
			console.error("❌ Profile Update Error:", error);
		}
	}

	async function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		const text = inputRef.current?.value.trim();
		
		if (!text || !inputRef.current) {
			// do nothing if text box empty
			return;
		}

		if (e.key === 'Enter') {
			const listClone = [...interestsList];

			listClone.push(text);

			setInterestsList(listClone);
  
			sendUpdatedInterestsList(listClone);

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