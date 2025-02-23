import { JSX, useEffect, useState } from 'react';
import { Link } from 'react-router';
import UploadListItemsSkeleton from './UploadListItemSkeleon';
import { IoDocumentTextOutline } from 'react-icons/io5';

interface UploadListProps {
	uploads: {
		_id: string;
		userId: string;
		filename: string;
		summary: string;
		text: string;
		chatHistory: unknown[];
		createdAt: string;
		updatedAt: string;
	}[];
}

const UploadsList = ({uploads}: UploadListProps) => {
	const [renderedList, setRenderedList] = useState<JSX.Element[] | null>(null);
	const [loaded, setLoaded] =  useState(false);

	useEffect(() => {
		setRenderedList(uploads.map((item) => {
			const createdDateObject = new Date(item.createdAt);
			const dateTimeString = `${createdDateObject.getHours()}:${createdDateObject.getMinutes()}, ${new Date(item.createdAt).toLocaleDateString()}`;
			setLoaded(true);

			return <Link
				to={{
					pathname: `/summary/${item._id}`
				}}
				className="flex flex-row w-full p-4 border-b-[1px] border-white last:border-0 hover:bg-gray-600 transition-colors duration-150">
				<div className='!aspect-square h-full min-w-10 my-auto mr-2'>
					<IoDocumentTextOutline className='h-full w-full' />
				</div>
				<div className='flex flex-col'>
					<span className='text-white !font-semibold'>{item.filename}</span>
					<span className='text-gray-400'>{dateTimeString}</span>
				</div>
			</Link>;
		}));
	}, [uploads]);

	return (
		<div className="flex flex-col items-center">
			<span className='self-start text-xl px-3 py-2 border-b-[1px] border-white w-full font-semibold'>Full Explanations</span>
			{loaded ? 
				renderedList : 
				<UploadListItemsSkeleton />}
		</div>
	);
};

export default UploadsList;
