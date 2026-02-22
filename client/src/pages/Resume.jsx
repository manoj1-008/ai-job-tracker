import { useState } from "react";
import api from "../services/api";

function Resume() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await api.post("/resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Resume uploaded successfully 🚀");
    } catch (err) {
      setMessage("Upload failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Upload Your Resume
        </h1>

        <form onSubmit={handleUpload} className="space-y-6">

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
              id="resumeUpload"
            />
            <label
              htmlFor="resumeUpload"
              className="cursor-pointer text-blue-600 font-semibold"
            >
              Click to Upload Resume (PDF)
            </label>
            {file && (
              <p className="mt-2 text-sm text-gray-600">
                Selected: {file.name}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
          >
            Upload Resume
          </button>
        </form>

        {message && (
          <div className="mt-6 text-center font-semibold text-green-600">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Resume;