// Basic skill keyword extraction and comparison

const extractKeywords = (text) => {
  if (!text) return [];

  const cleanedText = text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .split(/\s+/);

  // Remove small meaningless words
  const stopWords = [
    "the", "and", "for", "with", "this", "that",
    "are", "you", "your", "from", "have", "has",
    "was", "were", "will", "can", "our", "but",
  ];

  return cleanedText.filter(
    (word) => word.length > 2 && !stopWords.includes(word)
  );
};

const analyzeSkills = (resumeText, jobText) => {
  const resumeKeywords = extractKeywords(resumeText);
  const jobKeywords = extractKeywords(jobText);

  const resumeSet = new Set(resumeKeywords);
  const jobSet = new Set(jobKeywords);

  const matchingSkills = [];
  const missingSkills = [];

  jobSet.forEach((skill) => {
    if (resumeSet.has(skill)) {
      matchingSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  const gapPercentage =
    jobSet.size === 0
      ? 0
      : Math.round((missingSkills.length / jobSet.size) * 100);

  return {
    matchingSkills,
    missingSkills,
    gapPercentage,
  };
};

module.exports = analyzeSkills;