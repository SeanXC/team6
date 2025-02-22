import { User } from '@/types/user';
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";

interface UserFooterProps {
    user: User;
}

function UserFooter({ user }: UserFooterProps) {
	const navigate = useNavigate(); // ✅ Initialize navigation

	// ✅ Handle Logout Function
	const handleLogout = () => {
		googleLogout(); // ✅ Logout from Google
		localStorage.removeItem("token"); // ✅ Clear stored token
		localStorage.removeItem("user");  // ✅ Clear stored user data
		navigate("/login"); // ✅ Redirect to Login page
	};

	return (
		<div className='flex flex-row items-center justify-between h-20 bg-gray-600 rounded-xl p-4'>
			<img src={user.pfpUrl} className='h-full rounded-full' alt='User profile picture' />
			<input 
				type="button" 
				value="Sign Out" 
				onClick={handleLogout} 
				className='h-full border-[1px] border-white rounded-xl ml-4 px-4 cursor-pointer' 
			/>
		</div>
	);
}

export default UserFooter;