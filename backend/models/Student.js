// backend/models/Student.js
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  regNo: { type: String, required: true, unique: true },
  photo: { type: String, required: true }, // file name in uploads/
});

export default mongoose.model("Student", studentSchema);
