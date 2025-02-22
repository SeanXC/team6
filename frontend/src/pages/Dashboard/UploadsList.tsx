import { PastUploads } from '@/types/types';
import { Link } from 'react-router';

interface UploadsListProps {
	uploads: PastUploads;
}

function UploadsList({uploads}: UploadsListProps) {
	function getTimestampString(date: number) {
		const dateObject = new Date(date);

		const dateString = dateObject.toLocaleDateString();
		const timeString = dateObject.getHours() + ':' + dateObject.getMinutes();

		return `${timeString}, ${dateString}`;
	}

	const userUploadsRendered = uploads.map((item) => {
		return <li className='hover:bg-gray-500 border-b-[1px] border-white'>
			<Link to={{
				pathname: '/summary/' + item.id,
			}}
			className='flex flex-col p-4'>
				<span>{item.summaryName}</span>
				<span className='text-gray-300'>{getTimestampString(item.date)}</span>
			</Link>
		</li>;
	});

	return userUploadsRendered;
}

export default UploadsList;