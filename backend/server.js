// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

// Middleware
import authMiddleware from "./middleware/AuthMiddleware.js";

// Existing Routes
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import facultyRoutes from "./routes/facultyRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import studentAiRoutes from "./routes/studentAi.routes.js";
import studentTimetableRoutes from "./routes/studentTimetable.routes.js";
import weeklyTimetableRoutes from "./routes/weeklyTimetableRoutes.js";

// New routes for attendance + registration
import attendanceRoutes from "./routes/attendance.js";
import registerRoutes from "./routes/register.js";

// Load env
dotenv.config();

// Initialize express app
const app = express();

// Connect DB
connectDB();

// Global middleware
app.use(cors());
app.use(express.json());

// Serve uploaded photos (important!)
app.use("/uploads", express.static("uploads"));

// ---------------------------
// PUBLIC AUTH ROUTES
// ---------------------------
app.use("/api/auth", authRoutes);

// ---------------------------
// STUDENT ROUTES (PROTECTED)
// ---------------------------
app.use("/api/student", authMiddleware, studentRoutes);
app.use("/api/student", authMiddleware, studentAiRoutes);
app.use("/api/student", authMiddleware, studentTimetableRoutes);

// ---------------------------
// FACULTY ROUTES (PROTECTED)
// ---------------------------
app.use("/api/faculty", authMiddleware, facultyRoutes);

// ---------------------------
// ADMIN ROUTES (PROTECTED)
// ---------------------------
app.use("/api/admin", authMiddleware, adminRoutes);

// ---------------------------
// WEEKLY TIMETABLE
// ---------------------------
app.use("/api/timetable", weeklyTimetableRoutes);

// ---------------------------
// FACE ATTENDANCE SYSTEM
// ---------------------------
// Student Registration + Photo Upload
app.use("/api/register", registerRoutes);

// Run Python facial recognition & return present/absent
app.use("/api/attendance", attendanceRoutes);

// ---------------------------
// ROOT
// ---------------------------
app.get("/", (req, res) => {
  res.send("VIDYATRA backend is running 🚀");
});

// ---------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
