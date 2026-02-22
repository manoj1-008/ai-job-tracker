import { useEffect, useState } from "react";
import api from "../services/api";

const statuses = ["Applied", "Interview", "Offer", "Rejected"];

const statusColors = {
  Applied: "bg-blue-100 text-blue-700",
  Interview: "bg-yellow-100 text-yellow-700",
  Offer: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    company: "",
    role: "",
    description: "",
  });

  const fetchJobs = async () => {
    const res = await api.get("/jobs");
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/jobs", form);
    setForm({ company: "", role: "", description: "" });
    fetchJobs();
  };

  const updateStatus = async (id, status) => {
    await api.put(`/jobs/${id}`, { status });
    fetchJobs();
  };

  const deleteJob = async (id) => {
    await api.delete(`/jobs/${id}`);
    fetchJobs();
  };

  return (
    <div>

      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-800">
          Job Board
        </h2>
        <p className="text-gray-500 mt-2">
          Manage your applications visually.
        </p>
      </div>

      {/* Add Job */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border mb-10">
        <h3 className="font-semibold mb-4">Add New Job</h3>

        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            className="border px-4 py-2 rounded-lg flex-1 focus:ring-2 focus:ring-indigo-400"
            placeholder="Company"
            value={form.company}
            onChange={(e) =>
              setForm({ ...form, company: e.target.value })
            }
            required
          />

          <input
            className="border px-4 py-2 rounded-lg flex-1 focus:ring-2 focus:ring-indigo-400"
            placeholder="Role"
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
            required
          />

          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 rounded-lg hover:bg-indigo-700"
          >
            Add
          </button>
        </form>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-6 overflow-x-auto pb-4">

        {statuses.map((status) => (
          <div
            key={status}
            className="min-w-[300px] bg-gray-100 rounded-2xl p-4 flex flex-col"
          >
            <h3 className="font-semibold text-gray-700 mb-4">
              {status}
            </h3>

            <div className="space-y-4 overflow-y-auto max-h-[600px] pr-1">

              {jobs
                .filter((job) => job.status === status)
                .map((job) => (
                  <div
                    key={job._id}
                    className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-gray-800">
                          {job.company}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {job.role}
                        </p>
                      </div>

                      <span
                        className={`text-xs px-2 py-1 rounded-full ${statusColors[job.status]}`}
                      >
                        {job.status}
                      </span>
                    </div>

                    <div className="mt-4 flex justify-between items-center">

                      <select
                        className="text-sm border rounded-md px-2 py-1"
                        value={job.status}
                        onChange={(e) =>
                          updateStatus(job._id, e.target.value)
                        }
                      >
                        {statuses.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>

                      <button
                        onClick={() => deleteJob(job._id)}
                        className="text-red-500 text-sm hover:underline"
                      >
                        Delete
                      </button>

                    </div>
                  </div>
                ))}

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Jobs;