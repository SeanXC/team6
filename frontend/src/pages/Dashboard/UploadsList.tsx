import { useState } from 'react';
import axios from 'axios';

const Upload = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select a file to upload.");
            return;
        }

        setUploading(true);
        const token = localStorage.getItem("token");

        try {
            // ✅ Prepare form data for file upload
            const formData = new FormData();
            formData.append("file", selectedFile);

            // ✅ Upload Document
            const uploadResponse = await axios.post(
                "https://team6-production.up.railway.app/document/upload",
                formData,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("📄 Document uploaded:", uploadResponse.data);
            const documentId = uploadResponse.data.document._id;

            // ✅ Call Summarization API immediately after upload
            const summaryResponse = await axios.get(
                `https://team6-production.up.railway.app/document/summarize/${documentId}`,
                {
                    headers: { "Authorization": `Bearer ${token}` },
                }
            );

            console.log("📄 Summary Generated:", summaryResponse.data);

            alert("Upload and summarization completed!");
        } catch (error) {
            console.error("❌ Upload/Summary Error:", error);
            alert("Error uploading or summarizing document.");
        } finally {
            setUploading(false);
        }
    };


    return (
        <div className="flex flex-col items-center gap-4 p-6">
            <input type="file" accept=".pdf" onChange={handleFileChange} />
            <button
                onClick={handleUpload}
                disabled={uploading}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                {uploading ? "Uploading..." : "Upload PDF"}
            </button>
        </div>
    );
};

export default Upload;
