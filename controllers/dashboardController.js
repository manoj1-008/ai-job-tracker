const Job = require("../models/Job");

// ================= DASHBOARD STATS =================
const getDashboardStats = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user._id });

    const totalApplications = jobs.length;

    const interviewCount = jobs.filter(job => job.status === "Interview").length;
    const offerCount = jobs.filter(job => job.status === "Offer").length;
    const rejectedCount = jobs.filter(job => job.status === "Rejected").length;
    const appliedCount = jobs.filter(job => job.status === "Applied").length;

    const interviewRate =
      totalApplications === 0
        ? 0
        : Math.round((interviewCount / totalApplications) * 100);

    const offerRate =
      totalApplications === 0
        ? 0
        : Math.round((offerCount / totalApplications) * 100);

    const rejectionRate =
      totalApplications === 0
        ? 0
        : Math.round((rejectedCount / totalApplications) * 100);

    res.json({
      totalApplications,
      statusBreakdown: {
        Applied: appliedCount,
        Interview: interviewCount,
        Offer: offerCount,
        Rejected: rejectedCount,
      },
      interviewRate,
      offerRate,
      rejectionRate,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardStats };