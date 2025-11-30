import { useState, useEffect } from "react";

export default function AttendancePreview() {
  const [attendanceData, setAttendanceData] = useState({});
  const [daysInMonth, setDaysInMonth] = useState(0);
  const [monthName, setMonthName] = useState("");
  const [year, setYear] = useState(0);
  const [firstDayIndex, setFirstDayIndex] = useState(0);

  useEffect(() => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    setYear(currentYear);
    setMonthName(today.toLocaleString("default", { month: "long" }));

    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    setDaysInMonth(totalDays);

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    setFirstDayIndex(firstDay);

    // RANDOM SAMPLE ATTENDANCE
    let sample = {};
    for (let i = 1; i <= totalDays; i++) {
      sample[i] = ["P", "A", "O"][Math.floor(Math.random() * 3)];
    }
    setAttendanceData(sample);
  }, []);

  // Attendance summary
  const getAttendanceStats = () => {
    let present = 0, absent = 0, od = 0;

    Object.values(attendanceData).forEach((val) => {
      if (val === "P") present++;
      if (val === "A") absent++;
      if (val === "O") od++;
    });

    const total = present + absent + od;

    return {
      present,
      absent,
      od,
      percentage: total ? ((present / total) * 100).toFixed(1) : 0,
    };
  };

  const stats = getAttendanceStats();

  const getColor = (value) => {
    switch (value) {
      case "P":
        return "bg-green-500 text-white shadow-green-300";
      case "A":
        return "bg-red-500 text-white shadow-red-300";
      case "O":
        return "bg-blue-500 text-white shadow-blue-300";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div className="space-y-10 p-6">

      {/* PAGE HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-blue-700">
          Attendance – {monthName} {year}
        </h2>

        {/* Color Legend */}
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-lg"></div> Present
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-lg"></div> Absent
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-lg"></div> OD
          </div>
        </div>
      </div>

      {/* ----------------- GOOGLE-LIKE CALENDAR ----------------- */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Monthly Calendar
        </h3>

        {/* WEEK DAYS */}
        <div className="grid grid-cols-7 text-center font-semibold text-gray-500 mb-2">
          <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div>
          <div>Thu</div><div>Fri</div><div>Sat</div>
        </div>

        {/* CALENDAR GRID */}
        <div className="grid grid-cols-7 gap-3">
          {/* Empty tiles before the 1st day */}
          {Array.from({ length: firstDayIndex }).map((_, i) => (
            <div key={i}></div>
          ))}

          {/* Calendar days */}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
            <div
              key={day}
              className={`
                p-4 rounded-xl shadow-md text-center font-bold cursor-pointer
                hover:scale-105 transition transform duration-150
                ${getColor(attendanceData[day])}
              `}
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* ----------------- SUMMARY TABLE ----------------- */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 max-w-lg">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Monthly Attendance Summary
        </h3>

        <table className="w-full text-left border">
          <thead>
            <tr className="bg-gray-100 text-gray-700 border-b">
              <th className="p-3">Status</th>
              <th className="p-3">Days</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-3 font-semibold text-green-600">Present</td>
              <td className="p-3">{stats.present}</td>
            </tr>

            <tr className="border-b">
              <td className="p-3 font-semibold text-red-600">Absent</td>
              <td className="p-3">{stats.absent}</td>
            </tr>

            <tr className="border-b">
              <td className="p-3 font-semibold text-blue-600">OD / Permission</td>
              <td className="p-3">{stats.od}</td>
            </tr>

            <tr>
              <td className="p-3 font-bold">Attendance %</td>
              <td className="p-3 font-bold text-blue-700">{stats.percentage}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

