import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadsList from './UploadsList';
import UserFooter from './UserFooter';
import InfoTab from './InfoTab';
import axios from 'axios';
import { User, UserInfoShort } from '@/types/user';
import Upload from '@pages/Upload';
import AudioPlayer from '../Summary/AudioTutorGenerator';
import SumerizedDocsSkeleton from './SummarizedDocsSkeleon';

function Dashboard() {
	const navigate = useNavigate();
	const [user, setUser] = useState<UserInfoShort | null>(null);
	const [summarizedDocs, setSummarizedDocs] = useState<any[]>([]); // ✅ State for summaries
	const [uploadShow, setUploadShow] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		const storedUser = localStorage.getItem('user');
		const token = localStorage.getItem('token');

		if (!storedUser || !token) {
			navigate('/login');
			return;
		}

		const parsedUser: User = JSON.parse(storedUser);
		setUser({
			name: parsedUser.name,
			pfpUrl: localStorage.getItem('userPfp') || ''
		});


		// ✅ Fetch summarized documents
		const fetchSummarizedDocs = async () => {
			try {
				setLoading(true);

				const response = await axios.get('https://team6-production.up.railway.app/document/summarized', {
					headers: { Authorization: `Bearer ${token}` },
				});

				setLoading(false);

				setSummarizedDocs(response.data.documents);
			} catch (error) {
				console.error('Error fetching summaries:', error);
			}
		};

		fetchSummarizedDocs();
	}, [navigate]);

	if (!user) return <p>Loading...</p>;

	return (
		<div className="flex flex-row gap-4 box-border h-full">
			{/* LEFT SECTION: Uploads & Upload Button */}
			<div className="flex flex-col w-4/12 box-border p-4 pr-0 gap-4 h-max">
				<button
					className='group relative bg-gradient-to-br cursor-pointer from-blue-700 to-purple-700 p-4 rounded-xl text-center font-semibold'
					onClick={() => setUploadShow(true)}
				>
					<span>Upload a PDF</span>
					<div className='absolute top-0 left-0 w-full h-full z-[-1] rounded-xl bg-gradient-to-br from-blue-700 to-purple-700 transition-all duration-300 group-hover:blur-md'></div>
				</button>

				<ul className='grow bg-gray-700 rounded-xl overflow-auto'>
					<UploadsList uploads={summarizedDocs} />
				</ul>

				<UserFooter user={user} />
			</div>

			{/* RIGHT SECTION: Info, Summaries & Audio */}
			<div className='flex flex-col w-8/12 gap-4 p-4 pl-0 box-border'>
				<InfoTab />

				{/* ✅ Show Summaries & Generate Audio */}
				<div className="bg-gray-700 p-4 rounded-xl">
					<h2 className="text-xl font-semibold mb-4 text-white">Summarized Documents</h2>

					{loading ? (
						<SumerizedDocsSkeleton />
					) : summarizedDocs.length === 0 ? (
						<p className="text-gray-300">No summaries available.</p>
					) : (
						<ul className="space-y-6">
							{summarizedDocs
								.sort((a, b) => {
									return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
								})
								.map((doc) => (
									<li key={doc._id} className="bg-gray-800 p-4 rounded-lg shadow-md">
										<h3 className="font-semibold text-blue-400">{doc.filename}</h3>
										<p className="text-gray-200 my-4">{doc.summary}</p>

										{/* ✅ Generate Audio for each Document */}
										<AudioPlayer documentId={doc._id} />
									</li>
								))}
						</ul>
					)}
				</div>
			</div>
			{ uploadShow && <Upload closeModal={() => setUploadShow(false)} setSummarizedDocs={(docs) => setSummarizedDocs(docs)}/> }
		</div>
	);
}

export default Dashboard;