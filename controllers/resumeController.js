const fs = require("fs");
const pdfParse = require("pdf-parse");
const Resume = require("../models/Resume");

// ================= UPLOAD RESUME =================
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;

    const dataBuffer = fs.readFileSync(filePath);

    const pdfData = await pdfParse(dataBuffer);

    const resume = await Resume.create({
      user: req.user._id,
      fileName: req.file.originalname,
      extractedText: pdfData.text,
    });

    res.status(201).json({
      message: "Resume uploaded successfully",
      resumeId: resume._id,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadResume };