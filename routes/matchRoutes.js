const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const jobDescription = req.body.jobDescription;

    if (!req.file || !jobDescription) {
      return res.status(400).json({ message: "Resume and JD required" });
    }

    // Extract resume text
    const data = await pdfParse(req.file.buffer);
    const resumeText = data.text;

    // 🔥 Improved Cleaning Function
    const cleanText = (text) => {
      return text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter(word => word.length > 2);
    };

    const resumeWords = cleanText(resumeText);
    const jdWords = cleanText(jobDescription);

    const uniqueJDWords = [...new Set(jdWords)];

    // 🔥 Smarter Matching (partial + flexible)
    const matchingSkills = uniqueJDWords.filter(jdWord =>
      resumeWords.some(resumeWord =>
        resumeWord.includes(jdWord) || jdWord.includes(resumeWord)
      )
    );

    const missingSkills = uniqueJDWords.filter(jdWord =>
      !resumeWords.some(resumeWord =>
        resumeWord.includes(jdWord) || jdWord.includes(resumeWord)
      )
    );

    const matchPercentage =
      (matchingSkills.length / uniqueJDWords.length) * 100;

    res.json({
      matchPercentage: Math.round(matchPercentage),
      matchingSkills: matchingSkills.slice(0, 20),
      missingSkills: missingSkills.slice(0, 20),
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error analyzing resume" });
  }
});

module.exports = router;