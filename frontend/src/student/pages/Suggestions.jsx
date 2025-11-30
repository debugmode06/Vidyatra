import { useState } from "react";

export default function Recommendations() {
  const roles = [
    "Software Developer",
    "Data Scientist",
    "AI/ML Engineer",
    "Web Developer",
    "UI/UX Designer",
    "Cybersecurity Analyst",
    "Business Analyst",
  ];

  const domains = [
    "Artificial Intelligence",
    "Machine Learning",
    "Cybersecurity",
    "Web Development",
    "Mobile App Development",
    "Cloud Computing",
    "Finance & Business",
    "IoT & Embedded Systems",
  ];

  const [selectedRole, setSelectedRole] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [task, setTask] = useState("");

  /* -------------- TASK GENERATOR LOGIC ---------------- */
  const generateTask = (role, domain) => {
    const tasks = {
      "AI/ML Engineer": {
        "Machine Learning": "Build a machine learning model (classification) using scikit-learn on any dataset (Iris, Titanic).",
        "Artificial Intelligence": "Implement a simple AI agent (chatbot or recommendation engine) using Python.",
        "Data Engineering": "Clean, preprocess, and visualize a dataset using Pandas + Matplotlib.",
      },

      "Software Developer": {
        "Web Development": "Create a full-stack mini project using React + Node.js (Login, Dashboard, CRUD features).",
        "Cloud Computing": "Deploy a small backend API on AWS or Render and test endpoints.",
        "Mobile App Development": "Build a simple to-do mobile app using React Native or Flutter.",
      },

      "Web Developer": {
        "Web Development": "Build a responsive personal portfolio website with React, Tailwind, and animations.",
        "Cloud Computing": "Deploy a React project on Netlify/Render and integrate a backend API.",
      },

      "Cybersecurity Analyst": {
        "Cybersecurity": "Perform a vulnerability scan using Nmap and prepare a security audit report.",
        "Cloud Computing": "Set up IAM roles and permissions in AWS and test security policies.",
      },

      "Data Scientist": {
        "Machine Learning": "Perform EDA + build ML model on Kaggle dataset, and generate insights.",
        "Artificial Intelligence": "Apply NLP techniques to sentiment analysis using Python.",
      },

      "Business Analyst": {
        "Finance & Business": "Create a data dashboard using Power BI or Tableau with real sales data.",
        "Data Engineering": "Prepare ETL pipeline (extract → clean → load) using Python.",
      },

      "UI/UX Designer": {
        "Web Development": "Design a landing page wireframe and prototype in Figma.",
        "Mobile App Development": "Create a mobile app UI/UX mockup for a food delivery app.",
      },
    };

    return tasks[role]?.[domain] || "No task available for the selected role and domain. Try another combination.";
  };

  /* ------------------ Generate Recommendation ------------------ */
  const generateRecommendation = () => {
    if (!selectedRole || !selectedDomain || !skillLevel) {
      setRecommendation("⚠️ Please select all fields to generate a recommendation.");
      setTask("");
      return;
    }

    let baseMessage = `You are interested in becoming a ${selectedRole} in the ${selectedDomain} domain.`;

    let skillAdvice = "";
    if (skillLevel === "Beginner") {
      skillAdvice = "Start with basics and build small projects to strengthen core skills.";
    } else if (skillLevel === "Intermediate") {
      skillAdvice = "Focus on real-world projects, structured learning paths, and practice.";
    } else {
      skillAdvice = "Work on advanced problems, contribute to open-source, and build a strong portfolio.";
    }

    const domainTips = {
      "Artificial Intelligence": "Start learning Python, algorithms, NumPy, and AI model foundations.",
      "Machine Learning": "Learn ML algorithms, model evaluation, and participate in Kaggle projects.",
      Cybersecurity: "Focus on security tools, ethical hacking, network security, and threat analysis.",
      "Web Development": "Start with HTML, CSS, JS and move to React, backend APIs, and full-stack concepts.",
      "Mobile App Development": "Learn Flutter/React Native and build small cross-platform apps.",
      "Cloud Computing": "Start with AWS or Azure basics and learn deployment, S3, EC2, and serverless concepts.",
      "Finance & Business": "Learn analytics tools (Excel, Power BI), finance basics, and business modeling.",
      "IoT & Embedded Systems": "Practice with Arduino, sensors, and real-time embedded programming.",
    };

    setRecommendation(`
📌 Role: ${selectedRole}
📌 Domain: ${selectedDomain}
📌 Skill Level: ${skillLevel}

📘 Career Recommendation:
${domainTips[selectedDomain]}

🎯 Skill Advice:
${skillAdvice}
    `);

    setTask(generateTask(selectedRole, selectedDomain));
  };

  return (
    <div className="space-y-6">
      {/* PAGE TITLE */}
      <h2 className="text-3xl font-bold text-blue-700">
        Career Recommendations & Task Generator
      </h2>

      {/* CARD */}
      <div className="bg-white p-6 rounded-xl shadow space-y-6 max-w-3xl mx-auto">
        
        {/* ROLE */}
        <div>
          <label className="font-semibold">Interested Role</label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="p-3 border rounded-lg w-full mt-1"
          >
            <option value="">Select Role</option>
            {roles.map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>

        {/* DOMAIN */}
        <div>
          <label className="font-semibold">Preferred Domain</label>
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="p-3 border rounded-lg w-full mt-1"
          >
            <option value="">Select Domain</option>
            {domains.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>

        {/* SKILL LEVEL */}
        <div>
          <label className="font-semibold">Skill Level</label>
          <select
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value)}
            className="p-3 border rounded-lg w-full mt-1"
          >
            <option value="">Select Level</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        {/* SUBMIT */}
        <button
          onClick={generateRecommendation}
          className="w-full bg-blue-600 text-white p-3 rounded-lg text-lg font-semibold"
        >
          Generate Recommendation & Task
        </button>

        {/* OUTPUT */}
        {recommendation && (
          <div className="bg-gray-100 p-4 rounded-lg whitespace-pre-line text-gray-800">
            <h3 className="font-bold text-lg text-blue-700 mb-2">🎯 Recommendation</h3>
            {recommendation}
          </div>
        )}

        {task && (
          <div className="bg-green-100 p-4 rounded-lg whitespace-pre-line text-gray-800 mt-3">
            <h3 className="font-bold text-lg text-green-700 mb-2">🛠️ Suggested Task</h3>
            {task}
          </div>
        )}
      </div>
    </div>
  );
}



