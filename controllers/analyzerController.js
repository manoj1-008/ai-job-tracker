const Resume = require("../models/Resume");
const Job = require("../models/Job");
const analyzeSkills = require("../utils/skillAnalyzer");

// ================= ANALYZE SKILLS =================
const analyzeJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Get job
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Ensure job belongs to logged-in user
    if (job.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Get latest uploaded resume for user
    const resume = await Resume.findOne({ user: req.user._id })
      .sort({ createdAt: -1 });

    if (!resume) {
      return res.status(404).json({ message: "No resume found" });
    }

    const result = analyzeSkills(resume.extractedText, job.description);

    res.json({
      job: {
        company: job.company,
        role: job.role,
      },
      analysis: result,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { analyzeJob };