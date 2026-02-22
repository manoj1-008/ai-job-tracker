const Job = require("../models/Job");

// ================= ADD JOB =================
const addJob = async (req, res) => {
  try {
    const { company, role, description } = req.body;

    if (!company || !role) {
      return res.status(400).json({ message: "Company and role are required" });
    }

    const job = await Job.create({
      user: req.user._id,
      company,
      role,
      description,
    });

    res.status(201).json(job);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET ALL JOBS (WITH FILTER) =================
const getJobs = async (req, res) => {
  try {
    const { status } = req.query;

    let filter = { user: req.user._id };

    if (status) {
      filter.status = status;
    }

    const jobs = await Job.find(filter).sort({ createdAt: -1 });

    res.json(jobs);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= UPDATE JOB STATUS =================
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { status } = req.body;

    if (status) {
      job.status = status;
    }

    const updatedJob = await job.save();

    res.json(updatedJob);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= DELETE JOB =================
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await job.deleteOne();

    res.json({ message: "Job removed successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addJob,
  getJobs,
  updateJob,
  deleteJob,
};