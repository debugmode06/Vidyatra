import { useState } from "react";

export default function LeaveOdRequest() {
  const [activeForm, setActiveForm] = useState("leave"); // leave | od

  // Leave request states
  const [leaveData, setLeaveData] = useState({
    title: "",
    description: "",
    subject: "",
    fromDate: "",
    toDate: "",
    reason: "",
    file: null,
  });

  // OD request states
  const [odData, setOdData] = useState({
    title: "",
    description: "",
    reason: "",
    fromDate: "",
    toDate: "",
    file: null,
  });

  const handleLeaveChange = (e) => {
    const { name, value, files } = e.target;
    setLeaveData({ ...leaveData, [name]: files ? files[0] : value });
  };

  const handleOdChange = (e) => {
    const { name, value, files } = e.target;
    setOdData({ ...odData, [name]: files ? files[0] : value });
  };

  const submitLeave = () => {
    console.log("Leave Request Submitted:", leaveData);
    alert("Leave request submitted!");
  };

  const submitOd = () => {
    console.log("OD Request Submitted:", odData);
    alert("OD request submitted!");
  };

  return (
    <div className="space-y-6">
      {/* PAGE TITLE */}
      <h2 className="text-3xl font-bold text-blue-700">Leave & OD Requests</h2>

      {/* NAV TABS */}
      <div className="flex gap-4 border-b pb-3">
        <button
          onClick={() => setActiveForm("leave")}
          className={`px-4 py-2 rounded-lg ${
            activeForm === "leave"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Leave Request
        </button>

        <button
          onClick={() => setActiveForm("od")}
          className={`px-4 py-2 rounded-lg ${
            activeForm === "od"
              ? "bg-purple-600 text-white"
              : "bg-gray-200"
          }`}
        >
          OD Request
        </button>
      </div>

      {/* ======================== LEAVE FORM ======================== */}
      {activeForm === "leave" && (
        <div className="bg-white p-6 rounded-xl shadow space-y-4 max-w-2xl">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">
            Leave Request Form
          </h3>

          <input
            type="text"
            name="title"
            placeholder="Leave Title"
            onChange={handleLeaveChange}
            className="p-3 border rounded-lg w-full"
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            onChange={handleLeaveChange}
            className="p-3 border rounded-lg w-full"
          />

          <textarea
            name="description"
            placeholder="Description"
            rows="3"
            onChange={handleLeaveChange}
            className="p-3 border rounded-lg w-full"
          ></textarea>

          <textarea
            name="reason"
            placeholder="Reason for Leave"
            rows="3"
            onChange={handleLeaveChange}
            className="p-3 border rounded-lg w-full"
          ></textarea>

          <div className="flex gap-4">
            <input
              type="date"
              name="fromDate"
              onChange={handleLeaveChange}
              className="p-3 border rounded-lg w-full"
            />
            <input
              type="date"
              name="toDate"
              onChange={handleLeaveChange}
              className="p-3 border rounded-lg w-full"
            />
          </div>

          {/* FILE UPLOAD */}
          <input
            type="file"
            name="file"
            onChange={handleLeaveChange}
            className="p-3 border rounded-lg w-full"
          />

          <button
            onClick={submitLeave}
            className="w-full bg-blue-600 text-white p-3 rounded-lg"
          >
            Submit Leave Request
          </button>
        </div>
      )}

      {/* ======================== OD FORM ======================== */}
      {activeForm === "od" && (
        <div className="bg-white p-6 rounded-xl shadow space-y-4 max-w-2xl">
          <h3 className="text-xl font-semibold text-purple-600 mb-2">
            OD Request Form
          </h3>

          <input
            type="text"
            name="title"
            placeholder="OD Title"
            onChange={handleOdChange}
            className="p-3 border rounded-lg w-full"
          />

          <textarea
            name="description"
            placeholder="Description"
            rows="3"
            onChange={handleOdChange}
            className="p-3 border rounded-lg w-full"
          ></textarea>

          <textarea
            name="reason"
            placeholder="Reason for OD"
            rows="3"
            onChange={handleOdChange}
            className="p-3 border rounded-lg w-full"
          ></textarea>

          <div className="flex gap-4">
            <input
              type="date"
              name="fromDate"
              onChange={handleOdChange}
              className="p-3 border rounded-lg w-full"
            />
            <input
              type="date"
              name="toDate"
              onChange={handleOdChange}
              className="p-3 border rounded-lg w-full"
            />
          </div>

          {/* FILE UPLOAD */}
          <input
            type="file"
            name="file"
            onChange={handleOdChange}
            className="p-3 border rounded-lg w-full"
          />

          <button
            onClick={submitOd}
            className="w-full bg-purple-600 text-white p-3 rounded-lg"
          >
            Submit OD Request
          </button>
        </div>
      )}
    </div>
  );
}
