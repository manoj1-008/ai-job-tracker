const express = require("express");
const {
  addJob,
  getJobs,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addJob);
router.get("/", protect, getJobs);
router.put("/:id", protect, updateJob);
router.delete("/:id", protect, deleteJob);

module.exports = router;