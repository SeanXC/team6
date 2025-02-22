import { User } from '@/types/user';
import { googleLogout } from '@react-oauth/google';

interface UserFooterProps {
    user: User;
}

function UserFooter({user}: UserFooterProps) {
	return (
		<div className=' flex flex-row items-center justify-between h-20 bg-gray-600 rounded-xl p-4'>
			<img src={user.pfpUrl} className='h-full rounded-full' alt='User profile picture'></img>
			<input type="button" value="Sign Out" onClick={() => googleLogout()} className='h-full border-[1px] border-white rounded-xl ml-4 px-4 cursor-pointer' />
		</div>
	);
}

export default UserFooter;