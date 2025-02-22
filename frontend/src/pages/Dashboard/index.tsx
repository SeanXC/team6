import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ✅ Fix import
import UploadsList from './UploadsList';
import UserFooter from './UserFooter';
import InfoTab from './InfoTab';
import axios from 'axios';

function Dashboard() {
	const navigate = useNavigate();

	// ✅ Get authenticated user from localStorage
	const [user, setUser] = useState<{ name: string; pfpUrl: string } | null>(null);
	const [userUploads, setUserUploads] = useState([]);

	useEffect(() => {
		// ✅ Check if user is authenticated
		const storedUser = localStorage.getItem("user");
		const token = localStorage.getItem("token");

		if (!storedUser || !token) {
			navigate("/login"); // ⛔ Redirect to login if user is not authenticated
			return;
		}

		// ✅ Parse user from localStorage
		const parsedUser = JSON.parse(storedUser);
		setUser({
			name: parsedUser.name,
			pfpUrl: localStorage.getItem('userPfp') || '', // Placeholder profile picture
		});

		// ✅ Fetch user uploads from backend
		const fetchUploads = async () => {
			try {
				const response = await axios.get(`https://team6-production.up.railway.app/user/uploads`, {
					headers: { Authorization: `Bearer ${token}` }, // ✅ Send token for authentication
				});
				setUserUploads(response.data.uploads);
			} catch (error) {
				console.error("Error fetching uploads:", error);
			}
		};

		fetchUploads();
	}, [navigate]);

	if (!user) return <p>Loading...</p>;

	return (
		<div className="flex flex-row gap-4 box-border h-full">
			<div className="flex flex-col w-4/12 box-border p-4 pr-0 gap-4">
				<Link 
					className='bg-gradient-to-br from-blue-700 to-purple-700 hover:from-blue-800 hover:to-purple-800 p-4 rounded-xl text-center font-semibold'
					to="/upload"
				>
					Upload a PDF
				</Link>

				<ul className='grow bg-gray-700 rounded-xl overflow-auto'>
					<UploadsList uploads={userUploads} />
				</ul>
			</div>
			<div className='flex flex-col w-8/12 gap-4 p-4 pl-0 box-border'>
				<InfoTab user={user} />
				<UserFooter user={user} />
			</div>
		</div>
	);
}

export default Dashboard;