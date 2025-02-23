import Spinner from '@/components/Spinner';
import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';

type Props = {
	closeModal: () => void;
	setSummarizedDocs: (docs: any[]) => void;
}

function UploadPage(props: Props) {
	const {closeModal, setSummarizedDocs} = props; 
	
	const [file, setFile] = useState<File>();
	const [errorMessage, setErrorMessage] = useState('');
	const [fileSelected, setFileSelected] = useState(true);
	const [loading, setLoading] = useState<boolean>(false)
  	const token = localStorage.getItem("token");

	useEffect(() => {
		setFileSelected(file !== undefined);
	}, [file]);

	function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
		if (e.target.files) {
			const type = e.target.files[0].type;

			if (type !== 'application/pdf') {
				setErrorMessage('Invalid file. Select a PDF');
				return;
			}

			setErrorMessage('');
			setFile(e.target.files[0]);
		}
	}

	async function handleUploadClick() {
		if (!file) return;

		const formData = new FormData();
		formData.append("file", file);

		try {
			setLoading(true);
			const res = await axios.post(
				"https://team6-production.up.railway.app/document/upload",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			const summaryRes = await axios.get(
				"https://team6-production.up.railway.app/document/summarized",
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			// Update summaries in Dashboard via the callback
			setSummarizedDocs(summaryRes.data.documents);

			closeModal();
			console.log("res", res.data);
		} catch (error) {
			console.error("❌ Profile Update Error:", error);
		}
	}

	return (
		<div className="flex flex-col justify-center items-center w-full h-full absolute z-10 bg-black/50 fixed" onClick={closeModal}>
			<div className="w-80 h-60 bg-gray-700 rounded-xl flex flex-col items-center box-border p-4" onClick={(e) => e.stopPropagation()}>
				<div className='flex flex-row gap-4'>
					<label htmlFor="file-upload" 
						className="bg-cyan-800 p-4 rounded-xl cursor-pointer w-auto "
					>Select PDF</label>
					<input type="file" id="file-upload" className="hidden" accept=".pdf" onChange={handleFileChange} />
					<button onClick={handleUploadClick} disabled={!fileSelected} className="bg-gradient-to-br from-indigo-500 to-purple-500 p-4 rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-default">Upload✨</button>
				</div>
				<span className='text-red-400'>{errorMessage}</span>
				<>
					{ !loading ? (
						fileSelected ? <span className='text-green-400'>Selected: {file?.name}</span> : null
					) : <div className="flex flex-1 justify-center items-center w-full">
						<Spinner />
					</div>
					}
				</>
			</div>
		</div>
	);
}

export default UploadPage;