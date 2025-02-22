import { useState } from "react";
import axios from "axios";

function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      console.log("✅ File Selected:", event.target.files[0].name);
      setFile(event.target.files[0]);
    }
  };

  // ✅ Handle file upload
  const handleUpload = async () => {
    if (!file) {
      console.warn("⚠️ No file selected!");
      setUploadStatus("Please select a file to upload.");
      return;
    }

    setLoading(true);
    setUploadStatus(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // ✅ Retrieve token for authentication
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("❌ No Auth Token Found!");
        setUploadStatus("You must be logged in to upload.");
        setLoading(false);
        return;
      }

      console.log("📤 Sending file to backend...");
      const response = await axios.post(
        "https://team6-production.up.railway.app/document/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Upload Success:", response.data);
      setUploadStatus("Document uploaded successfully!");
    } catch (error) {
      console.error("❌ Upload Error:", error);
      setUploadStatus("Failed to upload document.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-2xl font-bold mb-4">Upload a Document</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="mb-4 p-2 border rounded-md"
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {uploadStatus && <p className="mt-4">{uploadStatus}</p>}
    </div>
  );
}

export default Upload;