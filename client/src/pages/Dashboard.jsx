import { useEffect, useState } from "react";
import api from "../services/api";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/dashboard");
        setStats(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return (
      <div className="text-gray-500 text-lg">
        Loading dashboard...
      </div>
    );
  }

  const pieData = {
    labels: ["Applied", "Interview", "Offer", "Rejected"],
    datasets: [
      {
        data: [
          stats.statusBreakdown.Applied,
          stats.statusBreakdown.Interview,
          stats.statusBreakdown.Offer,
          stats.statusBreakdown.Rejected,
        ],
        backgroundColor: [
          "#6366F1",
          "#F59E0B",
          "#10B981",
          "#EF4444",
        ],
      },
    ],
  };

  const barData = {
    labels: ["Interview Rate", "Offer Rate", "Rejection Rate"],
    datasets: [
      {
        label: "Percentage %",
        data: [
          stats.interviewRate,
          stats.offerRate,
          stats.rejectionRate,
        ],
        backgroundColor: "#6366F1",
      },
    ],
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-800">
          Dashboard Overview
        </h2>
        <p className="text-gray-500 mt-2">
          Track your job applications and performance metrics.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-4 gap-6 mb-12">
        <div className="bg-white rounded-2xl shadow-sm p-6 border">
          <p className="text-gray-500 text-sm">Total Applications</p>
          <h3 className="text-3xl font-bold mt-2">
            {stats.totalApplications}
          </h3>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border">
          <p className="text-gray-500 text-sm">Interview Rate</p>
          <h3 className="text-3xl font-bold text-yellow-500 mt-2">
            {stats.interviewRate}%
          </h3>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border">
          <p className="text-gray-500 text-sm">Offer Rate</p>
          <h3 className="text-3xl font-bold text-green-500 mt-2">
            {stats.offerRate}%
          </h3>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border">
          <p className="text-gray-500 text-sm">Rejection Rate</p>
          <h3 className="text-3xl font-bold text-red-500 mt-2">
            {stats.rejectionRate}%
          </h3>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 border">
          <h3 className="text-lg font-semibold mb-6 text-gray-700">
            Status Distribution
          </h3>
          <Pie data={pieData} />
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border">
          <h3 className="text-lg font-semibold mb-6 text-gray-700">
            Application Performance
          </h3>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;