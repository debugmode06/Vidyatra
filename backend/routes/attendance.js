import express from "express";
import { execFile } from "child_process"; // safer than exec
import path from "path";

const router = express.Router();

// POST /api/attendance/run
router.post("/run", (req, res) => {
  const { class: cls, section, date } = req.body;

  // Full path to Python script
  const scriptPath = path.join(process.cwd(), "backend", "face_attendance.py");

  // Full path to Python executable (Windows-safe)
  const pythonPath = "C:\\Users\\mrmoh\\AppData\\Local\\Programs\\Python\\Python313\\python.exe";

  // Arguments for Python script
  const args = [scriptPath, cls, section, date];

  execFile(pythonPath, args, (error, stdout, stderr) => {
    console.log("STDOUT:", stdout);
    console.log("STDERR:", stderr);

    if (error) {
      console.error("Python execution error:", error);
      return res.status(500).json({
        message: "Server error while running recognition",
        error: error.message,
      });
    }

    if (stderr) {
      console.error("Python STDERR:", stderr);
      return res.status(500).json({
        message: "Python script error",
        error: stderr,
      });
    }

    try {
      const attendance = JSON.parse(stdout);
      res.json({ message: "Attendance captured successfully", attendance });
    } catch (err) {
      console.error("JSON parse error:", err);
      res.status(500).json({
        message: "Failed to parse Python output",
        error: err.message,
      });
    }
  });
});

export default router;
