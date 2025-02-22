import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import UploadsList from './UploadsList';
import UserFooter from './UserFooter';

function Dashboard() {
	const user = {
		name: 'John Doe',
		pfpUrl: 'https://picsum.photos/128'
	};

	const [userUploads,] = useState([
		{
			summaryName: 'test 1',
			date: 1740230723882,
			id: 1,
		},
		{
			summaryName: 'test 2',
			date: 1740230700165,
			id: 2,
		},
		{
			summaryName: 'test 1',
			date: 1740230723882,
			id: 1,
		},
		{
			summaryName: 'test 2',
			date: 1740230700165,
			id: 2,
		},
		{
			summaryName: 'test 1',
			date: 1740230723882,
			id: 1,
		},
		{
			summaryName: 'test 2',
			date: 1740230700165,
			id: 2,
		},{
			summaryName: 'test 1',
			date: 1740230723882,
			id: 1,
		},
		{
			summaryName: 'test 2',
			date: 1740230700165,
			id: 2,
		},{
			summaryName: 'test 1',
			date: 1740230723882,
			id: 1,
		},
		{
			summaryName: 'test 2',
			date: 1740230700165,
			id: 2,
		}
	]);

	useEffect(() => {
		// fetch from backend
		// setUserUploads()
	}, []);

	return (
		<div className="flex flex-row gap-4 box-border h-full">
			<div className="flex flex-col w-4/12 box-border p-4 pr-0 gap-4">
				<Link 
					className='bg-gradient-to-br from-blue-700 to-purple-700 hover:from-blue-800 hover:to-purple-800 p-4 rounded-xl text-center font-semibold'
					to={{
						pathname: '/upload',
					}}
				>Upload a PDF</Link>

				<ul className='grow bg-gray-700 rounded-xl overflow-auto'>
					<UploadsList uploads={userUploads} />
				</ul>
			</div>
			<div className='flex flex-col w-8/12 gap-4 p-4 pl-0 box-border'>
				<div className='grow bg-gray-700 p-4 rounded-xl'></div>
				<UserFooter user={user} />
			</div>
		</div>
	);
}

export default Dashboard;