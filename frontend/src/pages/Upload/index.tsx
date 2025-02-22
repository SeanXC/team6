import { ChangeEvent, useEffect, useState } from 'react';

function UploadPage() {
	const [file, setFile] = useState<File>();
	const [errorMessage, setErrorMessage] = useState('');
	const [fileSelected, setFileSelected] = useState(true);

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

	function handleUploadClick() {
		// todo: send to backend
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
					{
						fileSelected ? <span className='text-green-400'>Selected: {file?.name}</span> : null
					}
				</>
			</div>
		</div>
	);
}

export default UploadPage;