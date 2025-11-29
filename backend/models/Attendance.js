import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  regNo: { type: String, required: true },
  class: { type: String, required: true },
  section: { type: String, required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  timeFrom: { type: String },
  timeTo: { type: String },
  facultyName: { type: String },
  status: { type: String, enum: ["present","absent","OD","permission"], default: "absent" },
  timeMarked: { type: String },
}, { timestamps: true });

export default mongoose.model("Attendance", attendanceSchema);
