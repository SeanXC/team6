import { User } from '@/types/user';
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

interface UserFooterProps {
    user: User;
}

function UserFooter({ user }: UserFooterProps) {
	const navigate = useNavigate(); // ✅ Initialize navigation

	// ✅ Handle Logout Function
	const handleLogout = () => {
		googleLogout(); // ✅ Logout from Google
		localStorage.removeItem('token'); // ✅ Clear stored token
		localStorage.removeItem('user');  // ✅ Clear stored user data
		localStorage.removeItem('userPfp');  // ✅ Clear stored user profile picture
		navigate('/'); // ✅ Redirect to Login page
	};

	return (
		<div className='flex flex-row items-center h-20 bg-gray-600 rounded-xl p-4'>
			<img src={user.pfpUrl} className='h-full rounded-full' alt='User profile picture' />
			<p className='ml-4 text-lg font-semibold'>{user.name}</p>
			<input 
				type="button" 
				value="Sign Out" 
				onClick={handleLogout} 
				className='h-full border-[1px] border-white rounded-xl px-4 cursor-pointer ml-auto' 
			/>
		</div>
	);
}

export default UserFooter;