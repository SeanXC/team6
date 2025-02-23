import React, { JSX, useEffect, useState } from 'react';
import { Link } from 'react-router';
import UploadListItemsSkeleton from './UploadListItemSkeleon';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';

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
	loadingUploadsList: boolean;
}

const UploadsList = ({uploads, loadingUploadsList}: UploadListProps) => {
	const [renderedList, setRenderedList] = useState<JSX.Element[] | null>(null);
	const [loading, setLoading] =  useState<boolean>(false);

	useEffect(() => {
		setRenderedList(uploads.map((item) => {
			const createdDateObject = new Date(item.createdAt);
			const dateTimeString = `${createdDateObject.getHours()}:${createdDateObject.getMinutes()}, ${new Date(item.createdAt).toLocaleDateString()}`;

			return <Link
				to={{
					pathname: `/summary/${item._id}`
				}}
				className="group relative overflow-hidden flex flex-row w-full p-4 border-b-[1px] border-white last:border-0 hover:bg-gray-600 transition-colors duration-150">
				<div className='!aspect-square h-full min-w-10 my-auto mr-2'>
					<IoDocumentTextOutline className='h-full w-full' />
				</div>
				<div className='flex flex-col'>
					<span className='text-white !font-semibold'>{item.filename}</span>
					<span className='text-gray-400'>{dateTimeString}</span>
				</div>
				<IoMdClose onClick={(e) => handleDeleteButtonPress(e, item.filename, item._id)} className="w-8 h-8 absolute right-[-2rem] top-1/2 transform translate-y-[-50%] group-hover:text-red-400 group-hover:right-[1rem] transition-all duration-150" />
			</Link>;
		}));

	}, [uploads]);

	useEffect(() => {
		setLoading(loadingUploadsList)
	}, [loadingUploadsList])
	

	async function handleDeleteButtonPress(e: React.MouseEvent, filename: string, id: string) {
		e.preventDefault();
		
		const token = localStorage.getItem('token');

		if (!token) {
			console.error('No token found when trying to delete item');
			return;
		}

		const confirmDelete = confirm(`Are you sure you want to delete '${filename}'?`);
		
		if (confirmDelete) {
			await axios.delete(`https://team6-production.up.railway.app/document/delete/${id}`, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});
			
			location.reload();
		}
	}

	return (
		<div className="flex flex-col items-center">
			<span className='self-start text-xl px-3 py-2 border-b-[1px] border-white w-full font-semibold'>Full Explanations</span>
			{ loading ? (
				<UploadListItemsSkeleton />
			) : renderedList && renderedList.length > 0 ? (
				renderedList
			) : (
				<p className="p-4 text-gray-300">No uploads available</p>
			)}
		</div>
	);
};

export default UploadsList;
