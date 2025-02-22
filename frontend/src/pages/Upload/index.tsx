import Spinner from '@/components/Spinner';
import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UploadPage() {
  const navigate = useNavigate();
	const [file, setFile] = useState<File>();
	const [errorMessage, setErrorMessage] = useState('');
	const [fileSelected, setFileSelected] = useState(true);
	const [loading, setLoading] = useState<boolean>(false);
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

			console.log("res", res.data);
      navigate("/dashboard");
		} catch (error) {
			console.error("❌ Profile Update Error:", error);
		}
	}

	return (
		<div className="flex flex-col justify-center items-center w-full h-full">
			<div className="w-80 h-60 bg-gray-700 rounded-xl flex flex-col items-center box-border p-4">
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
						): <Spinner />
					}
				</>
			</div>
		</div>
	);
}

export default UploadPage;