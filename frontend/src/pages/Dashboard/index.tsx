import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UploadsList from './UploadsList';
import UserFooter from './UserFooter';
import InfoTab from './InfoTab';
import axios from 'axios';
import SummaryDisplay from '../Summary/SummaryDisplay';
import { User } from '@/types/user';

function Dashboard() {
	const navigate = useNavigate();
	const [user, setUser] = useState<{ name: string; pfpUrl: string } | null>(null);
	const [userUploads, setUserUploads] = useState([]);
	const [summarizedDocs, setSummarizedDocs] = useState([]); // ✅ State for summaries

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		const token = localStorage.getItem("token");

		if (!storedUser || !token) {
			navigate("/login");
			return;
		}

		const parsedUser: User = JSON.parse(storedUser);
		setUser({
			name: parsedUser.name,
			pfpUrl: localStorage.getItem('userPfp') || ""
		});

		// ✅ Fetch user uploads
		const fetchUploads = async () => {
			try {
				const response = await axios.get(`https://team6-production.up.railway.app/user/uploads`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				setUserUploads(response.data.uploads);
			} catch (error) {
				console.error("Error fetching uploads:", error);
			}
		};

		// ✅ Fetch summarized documents
		const fetchSummarizedDocs = async () => {
			try {
				const response = await axios.get(`https://team6-production.up.railway.app/document/summarized`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				setSummarizedDocs(response.data.documents);
			} catch (error) {
				console.error("Error fetching summaries:", error);
			}
		};

		fetchUploads();
		fetchSummarizedDocs();
	}, [navigate]);

	if (!user) return <p>Loading...</p>;

	return (
		<div className="flex flex-row gap-4 box-border h-full">
			<div className="flex flex-col w-4/12 box-border p-4 pr-0 gap-4">
				<Link 
					className='group relative bg-gradient-to-br from-blue-700 to-purple-700 p-4 rounded-xl text-center font-semibold'
					to="/upload"
				>
					<span>Upload a PDF</span>
					<div className='absolute top-0 left-0 w-full h-full z-[-1] rounded-xl bg-gradient-to-br from-blue-700 to-purple-700 transition-all duration-300 group-hover:blur-md'></div>
				</Link>

				<ul className='grow bg-gray-700 rounded-xl overflow-auto'>
					<UploadsList uploads={summarizedDocs} />
				</ul>
			</div>
			<div className='flex flex-col w-8/12 gap-4 p-4 pl-0 box-border'>
				<InfoTab user={user} />
				<SummaryDisplay summarizedDocs={summarizedDocs} /> {/* ✅ Show summaries */}
				<UserFooter user={user} />
			</div>
		</div>
	);
}

export default Dashboard;