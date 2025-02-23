import { Link, useNavigate, useParams } from 'react-router';
import { IoMdArrowBack } from 'react-icons/io';
import ExplanationText from './ExplanationText';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SummaryPage() {
	const params = useParams();
	const navigate = useNavigate();

	const id = params.id;
	const [summaryText, setSummaryText] = useState('');
	const [title, setTitle] = useState('');

	const handleLoadText = async () => {
		try {
			const token = localStorage.getItem('token');
			if (!token) {
				navigate('/login');
			}

			const response = await axios.get(
				`https://team6-production.up.railway.app/document/explanation/${id}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			setSummaryText(response.data.explanation);
			setTitle(response.data.title);
		} catch (err) {
			console.error('❌ Error generating summary text:', err);
		}
	};

	useEffect(() => {
		handleLoadText();
	}, []);

	return (
		<div className="relative flex flex-col overflow-hidden w-[calc(100%-2rem)] min-h-[calc(100dvh-2rem)] bg-gray-700 rounded-xl p-4 pt-16 m-4 box-border">
			<Link className="absolute top-0 left-0 flex flex-row items-center hover:bg-gray-600 w-fit p-4"
				to={{
					pathname: '/dashboard',
				}}>
				<IoMdArrowBack className="w-8 h-8" />
				<span className="text-xl">&nbsp; Back</span>
			</Link>
			<div className="grow">
				<h1 className="text-3xl pb-4 !font-semibold">{title}</h1>
				<ExplanationText text={summaryText} />
			</div>
		</div>
	);
}