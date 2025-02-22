import { JSX, useEffect, useState } from 'react';
import { Link } from 'react-router';
import UploadListItemsSkeleton from './UploadListItemSkeleon';

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
				className="flex flex-col w-full p-4 border-b-[1px] border-white last:border-0 hover:bg-gray-600 transition-colors duration-150">
				<span className='text-white "font-semibold'>{item.filename}</span>
				<span className='text-gray-400'>{dateTimeString}</span>
			</Link>;
		}));
	}, [uploads]);

	return (
		<div className="flex flex-col items-center">
			{loaded ? 
			renderedList : 
			<UploadListItemsSkeleton />}
		</div>
	);
};

export default UploadsList;
