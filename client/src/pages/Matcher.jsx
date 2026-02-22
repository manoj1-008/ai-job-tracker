import { useState } from "react";
import api from "../services/api";

function Matcher() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume || !jobDescription) {
      alert("Upload resume and enter JD");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jobDescription", jobDescription);

    try {
      setLoading(true);
      const res = await api.post("/match", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
    } catch {
      alert("Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-10">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-10">

        <h1 className="text-4xl font-bold mb-8 text-gray-800">
          AI Resume Analyzer
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setResume(e.target.files[0])}
            className="border p-3 rounded-lg w-full"
          />

          <textarea
            rows="6"
            placeholder="Paste Job Description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="border p-4 rounded-lg w-full"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            {loading ? "Analyzing..." : "Analyze Match"}
          </button>
        </form>

        {result && (
          <div className="mt-10">

            <div className="text-3xl font-bold text-center text-blue-600 mb-6">
              Match Score: {result.matchPercentage}%
            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="bg-green-50 p-6 rounded-xl">
                <h3 className="font-bold text-green-700 mb-3">
                  Matching Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.matchingSkills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-red-50 p-6 rounded-xl">
                <h3 className="font-bold text-red-700 mb-3">
                  Missing Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.missingSkills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-red-200 text-red-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Matcher;