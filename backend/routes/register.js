import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Student from "../models/Student.js"; // or Faculty.js if needed

const router = express.Router();

// --- Multer setup for file uploads ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "uploads";
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // store as regNo-timestamp.ext
    const ext = path.extname(file.originalname);
    const timestamp = Date.now();
    cb(null, `${req.body.regNo}-${timestamp}${ext}`);
  }
});

const upload = multer({ storage });

// --- POST /api/register ---
// Fields: name, regNo, photo
router.post("/", upload.single("photo"), async (req, res) => {
  try {
    const { name, regNo } = req.body;
    if (!name || !regNo || !req.file) return res.status(400).json({ error: "Name, RegNo and photo required" });

    // Save in MongoDB
    const existing = await Student.findOne({ regNo });
    if (existing) return res.status(400).json({ error: "Student with this regNo already exists" });

    const newStudent = new Student({
      name,
      regNo,
      photo: req.file.filename
    });

    await newStudent.save();
    res.json({ message: "Registered successfully", student: newStudent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
});

export default router;
