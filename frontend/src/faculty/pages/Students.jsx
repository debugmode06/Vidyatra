import { useState } from "react";

export default function Students() {
  const initialStudents = [
    {
      name: "Aarav Sharma",
      regNo: "CSE21045",
      department: "CSE",
      year: "2nd Year",
      section: "A",
      cgpa: 8.7,
      attendance: 92,
      age: 19,
      address: "Delhi, India",
    },
    {
      name: "Kavya Singh",
      regNo: "ECE22012",
      department: "ECE",
      year: "1st Year",
      section: "B",
      cgpa: 7.4,
      attendance: 85,
      age: 18,
      address: "Mumbai, India",
    },
    {
      name: "Rohit Mehta",
      regNo: "AIML20033",
      department: "AIML",
      year: "3rd Year",
      section: "A",
      cgpa: 6.5,
      attendance: 78,
      age: 20,
      address: "Chennai, India",
    },
  ];

  const [students] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("All");
  const [filterSection, setFilterSection] = useState("All");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const performanceLevel = (cgpa) => {
    if (cgpa >= 8.5) return { text: "Excellent", color: "bg-green-500" };
    if (cgpa >= 7) return { text: "Good", color: "bg-yellow-500" };
    return { text: "Needs Improvement", color: "bg-red-500" };
  };

  const filteredStudents = students.filter((s) => {
    let matchesSearch = s.regNo.toLowerCase().includes(search.toLowerCase());
    let matchesDept = filterDept === "All" || s.department === filterDept;
    let matchesSection = filterSection === "All" || s.section === filterSection;
    return matchesSearch && matchesDept && matchesSection;
  });

  return (
    <div className="relative p-6">
      {/* PAGE TITLE */}
      <h2 className="text-3xl font-bold text-blue-700 mb-6">
        College Students Directory
      </h2>

      {/* FILTERS */}
      <div className="flex gap-4 mb-6 items-center">

        {/* Search Bar */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 border rounded-xl shadow w-1/3 focus:ring-2 focus:ring-blue-400"
          placeholder="Search by Register Number"
        />

        {/* Department Filter */}
        <select
          value={filterDept}
          onChange={(e) => setFilterDept(e.target.value)}
          className="p-3 border rounded-xl shadow"
        >
          <option>All</option>
          <option>CSE</option>
          <option>ECE</option>
          <option>AIML</option>
          <option>EEE</option>
          <option>MBA</option>
        </select>

        {/* Section Filter */}
        <select
          value={filterSection}
          onChange={(e) => setFilterSection(e.target.value)}
          className="p-3 border rounded-xl shadow"
        >
          <option>All</option>
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>
      </div>

      {/* STUDENTS TABLE */}
      <div className="bg-white p-6 rounded-xl shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-600 bg-gray-100">
              <th className="p-3">Name</th>
              <th className="p-3">Reg. No</th>
              <th className="p-3">Department</th>
              <th className="p-3">Year</th>
              <th className="p-3">Section</th>
              <th className="p-3">CGPA</th>
              <th className="p-3">Performance</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((s, i) => {
              const perf = performanceLevel(s.cgpa);

              return (
                <tr
                  key={i}
                  className="border-b cursor-pointer hover:bg-blue-50 transition"
                  onClick={() => setSelectedStudent(s)}
                >
                  <td className="p-3 font-medium text-blue-700">{s.name}</td>
                  <td className="p-3">{s.regNo}</td>
                  <td className="p-3">{s.department}</td>
                  <td className="p-3">{s.year}</td>
                  <td className="p-3">{s.section}</td>
                  <td className="p-3">{s.cgpa}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${perf.color}`}
                    >
                      {perf.text}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredStudents.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No students found.</p>
        )}
      </div>

      {/* STUDENT DETAILS SIDE PANEL */}
      {selectedStudent && (
        <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-xl p-6 border-l animate-slideIn z-20">

          <button
            onClick={() => setSelectedStudent(null)}
            className="text-red-600 font-semibold mb-4"
          >
            Close ✖
          </button>

          <h3 className="text-2xl font-bold text-blue-700 mb-4">
            {selectedStudent.name}
          </h3>

          <div className="space-y-3 text-gray-700">

            <p><strong>Register Number:</strong> {selectedStudent.regNo}</p>
            <p><strong>Department:</strong> {selectedStudent.department}</p>
            <p><strong>Year of Study:</strong> {selectedStudent.year}</p>
            <p><strong>Section:</strong> {selectedStudent.section}</p>
            <p><strong>CGPA:</strong> {selectedStudent.cgpa}</p>

            <p>
              <strong>Performance:</strong>
              <span
                className={`ml-2 px-3 py-1 rounded-full text-white text-sm ${
                  performanceLevel(selectedStudent.cgpa).color
                }`}
              >
                {performanceLevel(selectedStudent.cgpa).text}
              </span>
            </p>

            <p><strong>Attendance:</strong> {selectedStudent.attendance}%</p>

            <p><strong>Age:</strong> {selectedStudent.age}</p>
            <p><strong>Address:</strong> {selectedStudent.address}</p>

          </div>
        </div>
      )}

      {/* Slide Animation */}
      <style>
        {`
          .animate-slideIn {
            animation: slideIn 0.3s ease-out;
          }
          @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
        `}
      </style>
    </div>
  );
}
