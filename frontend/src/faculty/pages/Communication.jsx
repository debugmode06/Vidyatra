import { useState } from "react";

export default function CommunicationFaculty() {
  /* ---------------- NAV BAR ---------------- */
  const [activePanel, setActivePanel] = useState("broadcast");

  /* ---------------- BROADCAST PANEL ---------------- */
  const [broadcastList, setBroadcastList] = useState([
    { sender: "teacher", text: "Welcome students!" },
  ]);

  const [broadcastInput, setBroadcastInput] = useState("");

  const sendBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastInput.trim()) return;

    setBroadcastList([...broadcastList, { sender: "teacher", text: broadcastInput }]);
    setBroadcastInput("");
  };

  /* ---------------- INDIVIDUAL PANEL ---------------- */
  const [students, setStudents] = useState([
    { reg: "101", name: "Rohit", dept: "CSE", section: "A" },
    { reg: "102", name: "Meera", dept: "ECE", section: "B" },
  ]);

  const [selectedStudent, setSelectedStudent] = useState(null);

  const [individualChats, setIndividualChats] = useState({
    Rohit: [{ sender: "student", text: "Sir I need help." }],
    Meera: [],
  });

  const [individualInput, setIndividualInput] = useState("");

  const sendIndividual = (e) => {
    e.preventDefault();
    if (!individualInput.trim() || !selectedStudent) return;

    const updatedChats = {
      ...individualChats,
      [selectedStudent]: [
        ...individualChats[selectedStudent],
        { sender: "teacher", text: individualInput },
      ],
    };

    setIndividualChats(updatedChats);
    setIndividualInput("");
  };

  /* ----------- ADD STUDENT FEATURE (UPDATED) ----------- */
  const [newReg, setNewReg] = useState("");
  const [newName, setNewName] = useState("");
  const [newDept, setNewDept] = useState("CSE");
  const [newSection, setNewSection] = useState("A");

  const addStudent = () => {
    if (!newReg.trim() || !newName.trim()) return;

    const newStudent = {
      reg: newReg,
      name: newName,
      dept: newDept,
      section: newSection,
    };

    setStudents([...students, newStudent]);
    setIndividualChats({ ...individualChats, [newName]: [] });

    setNewReg("");
    setNewName("");
    setNewDept("CSE");
    setNewSection("A");
  };

  return (
    <div className="p-6 space-y-6">

      {/* ---------------- NAVIGATION BAR ---------------- */}
      <div className="flex gap-4 border-b pb-3">
        <button
          onClick={() => setActivePanel("broadcast")}
          className={`px-4 py-2 rounded-lg ${
            activePanel === "broadcast" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Broadcast Messages
        </button>

        <button
          onClick={() => setActivePanel("individual")}
          className={`px-4 py-2 rounded-lg ${
            activePanel === "individual" ? "bg-purple-600 text-white" : "bg-gray-200"
          }`}
        >
          Individual Messages
        </button>
      </div>

      {/* ---------------- BROADCAST PANEL ---------------- */}
      {activePanel === "broadcast" && (
        <div>
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            Broadcast Message Panel
          </h2>

          <div className="bg-white p-6 rounded-xl shadow h-[450px] flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-3">
              {broadcastList.map((b, i) => (
                <div key={i} className="p-3 rounded-lg bg-blue-500 text-white max-w-xs">
                  {b.text}
                </div>
              ))}
            </div>

            <form onSubmit={sendBroadcast} className="flex gap-2 mt-4">
              <input
                value={broadcastInput}
                onChange={(e) => setBroadcastInput(e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Broadcast to all students..."
              />
              <button className="bg-blue-600 text-white px-4 rounded-lg">Send</button>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- INDIVIDUAL PANEL ---------------- */}
      {activePanel === "individual" && (
        <div>
          <h2 className="text-2xl font-bold text-purple-700 mb-4">
            Individual Message Panel
          </h2>

          <div className="grid grid-cols-4 gap-4 h-[500px]">

            {/* STUDENT LIST + ADD */}
            <div className="bg-gray-100 p-4 rounded-xl shadow">
              <h3 className="font-semibold text-lg mb-3">Students</h3>

              {/* Add Student */}
              <div className="space-y-2 mb-4">

                <input
                  value={newReg}
                  onChange={(e) => setNewReg(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Register Number"
                />

                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Student Name"
                />

                {/* Department Dropdown */}
                <select
                  value={newDept}
                  onChange={(e) => setNewDept(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option>CSE</option>
                  <option>ECE</option>
                  <option>AIML</option>
                  <option>EEE</option>
                  <option>MECH</option>
                  <option>MBA</option>
                </select>

                {/* Section Dropdown */}
                <select
                  value={newSection}
                  onChange={(e) => setNewSection(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option>A</option>
                  <option>B</option>
                  <option>C</option>
                  <option>D</option>
                </select>

                <button
                  onClick={addStudent}
                  className="w-full bg-green-600 text-white p-2 rounded-lg"
                >
                  Add Student
                </button>
              </div>

              {/* Student Buttons */}
              {students.map((s) => (
                <button
                  key={s.reg}
                  onClick={() => setSelectedStudent(s.name)}
                  className={`block w-full text-left p-2 rounded-lg mb-2 ${
                    selectedStudent === s.name
                      ? "bg-purple-600 text-white"
                      : "bg-white shadow"
                  }`}
                >
                  {s.reg} - {s.name}
                  <br />
                  <span className="text-sm text-gray-600">
                    {s.dept} • Section {s.section}
                  </span>
                </button>
              ))}
            </div>

            {/* CHAT WINDOW */}
            <div className="col-span-3 bg-white p-5 rounded-xl shadow flex flex-col">
              {!selectedStudent ? (
                <p className="text-gray-500 text-center mt-20">
                  Select a student to start chatting
                </p>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto space-y-3">
                    {individualChats[selectedStudent].map((msg, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-lg max-w-xs ${
                          msg.sender === "teacher"
                            ? "ml-auto bg-purple-600 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {msg.text}
                      </div>
                    ))}
                  </div>

                  <form onSubmit={sendIndividual} className="flex gap-2 mt-4">
                    <input
                      value={individualInput}
                      onChange={(e) => setIndividualInput(e.target.value)}
                      className="w-full p-3 border rounded-lg"
                      placeholder={`Message ${selectedStudent}...`}
                    />
                    <button className="bg-purple-600 text-white px-4 rounded-lg">
                      Send
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

