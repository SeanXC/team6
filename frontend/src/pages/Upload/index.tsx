import { ChangeEvent, useState } from "react";

function UploadPage() {
    const [file, setFile] = useState<File>();
    const [errorMessage, setErrorMessage] = useState('test');

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            const type = e.target.files[0].type;

            if (type !== "application/pdf") {

            }
        }
    }

    function handleUploadClick() {

    }

    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <div className="w-80 h-60 bg-gray-700 rounded-xl flex flex-col justify-center items-center">
                <label htmlFor="file-upload" 
                    className="bg-cyan-800 p-4 rounded-xl font-semibold cursor-pointer w-auto "
                >Select PDF</label>
                <input type="file" id="file-upload" className="hidden" accept=".pdf" />
                <button onClick={handleUploadClick} className="bg-gradient-to-br from-indigo-500 to-purple-500 p-4 rounded-xl">Upload✨</button>
                <span>{errorMessage}</span>
            </div>
        </div>
    )
}

export default UploadPage;