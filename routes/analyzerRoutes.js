const express = require("express");
const { analyzeJob } = require("../controllers/analyzerController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:jobId", protect, analyzeJob);

module.exports = router;