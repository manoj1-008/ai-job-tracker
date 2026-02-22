import { useState } from "react";
import api from "../services/api";

function Analyzer() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (e) => {
    e.preventDefault();

    if (!resume || !jobDescription) {
      alert("Upload resume and enter job description");
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
    } catch (err) {
      alert("Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-gray-100 p-10">

      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl p-10">

        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          🚀 AI Skill Gap Analyzer
        </h1>

        <form onSubmit={handleAnalyze} className="space-y-6">

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block font-semibold mb-2">
                Upload Resume (PDF)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setResume(e.target.files[0])}
                className="border p-3 rounded-xl w-full"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Paste Job Description
              </label>
              <textarea
                rows="6"
                placeholder="Paste JD here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="border p-3 rounded-xl w-full"
              />
            </div>

          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-700 transition"
          >
            {loading ? "Analyzing..." : "Analyze Now"}
          </button>
        </form>

        {result && (
          <div className="mt-12">

            <div className="text-center mb-10">
              <div className="text-5xl font-bold text-indigo-600">
                {result.matchPercentage}%
              </div>
              <div className="text-gray-500 mt-2">
                Match Score
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">

              <div className="bg-green-50 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-green-700 mb-4">
                  ✅ Matching Skills
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

              <div className="bg-red-50 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-red-700 mb-4">
                  ❌ Missing Skills
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

export default Analyzer;