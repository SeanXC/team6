import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthenticated from '@/hooks/useAuthenticated';
import sendAuthedAxios from '@/utils/sendAuthedAxios';

const UpdateProfile: React.FC = () => {
	const navigate = useNavigate();
	const storedUser = localStorage.getItem('user');
	const user = storedUser ? JSON.parse(storedUser) : null;
	const token = useAuthenticated({navToLoginOnUnauthed: true});

	// State for form inputs
	const [age, setAge] = useState<number | ''>(user?.age || '');
	const [interests, setInterests] = useState<string[]>(user?.interests || []);
	const [newInterest, setNewInterest] = useState<string>('');

	useEffect(() => {
		// Redirect if user is not logged in
		if (!token || !user) {
			navigate('/login');
		}
	}, [navigate, token, user]);

	// Handle adding an interest
	const handleAddInterest = () => {
		if (newInterest.trim() !== '') {
			setInterests([...interests, newInterest.trim()]);
			setNewInterest(''); // Clear input after adding
		}
	};

	// Handle removing an interest
	const handleRemoveInterest = (index: number) => {
		setInterests(interests.filter((_, i) => i !== index));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
	
		try {
			const res = await sendAuthedAxios('/user/update-profile', {
				data: { age, interests },
				method: 'PUT'
			}, token );
	
			console.log('✅ Profile Updated:', res.data);
	
			// ✅ Update user in localStorage
			localStorage.setItem('user', JSON.stringify(res.data.user));
	
			// ✅ Redirect to Dashboard
			navigate('/dashboard');
		} catch (error) {
			console.error('❌ Profile Update Error:', error);
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-800">
			<div className="bg-gray-700 p-6 rounded-lg w-96">
				<h2 className="text-xl font-bold text-white text-center mb-4">Update Profile</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					{/* Age Input */}
					<div>
						<label className="text-white">Age:</label>
						<input
							type="number"
							value={age}
							onChange={(e) => setAge(Number(e.target.value))}
							className="w-full p-2 rounded-md bg-gray-600 text-white mt-1"
							required
						/>
					</div>

					{/* Interests Input */}
					<div>
						<label className="text-white">Interests:</label>
						<div className="flex gap-2">
							<input
								type="text"
								value={newInterest}
								onChange={(e) => setNewInterest(e.target.value)}
								className="flex-1 p-2 rounded-md bg-gray-600 text-white mt-1"
								placeholder="Add an interest..."
							/>
							<button
								type="button"
								onClick={handleAddInterest}
								className="bg-blue-600 text-white px-4 py-2 rounded-md mt-1"
							>
								Add
							</button>
						</div>
					</div>

					{/* Display Interests */}
					<div className="space-y-2">
						{interests.map((interest, index) => (
							<div key={index} className="flex justify-between items-center bg-gray-600 p-2 rounded-md">
								<span className="text-white">{interest}</span>
								<button
									type="button"
									onClick={() => handleRemoveInterest(index)}
									className="text-red-400 hover:text-red-600"
								>
									✖
								</button>
							</div>
						))}
					</div>

					{/* Submit Button */}
					<button type="submit" className="w-full bg-green-600 text-white p-2 rounded-md">
						Save Profile
					</button>
				</form>
			</div>
		</div>
	);
};

export default UpdateProfile;