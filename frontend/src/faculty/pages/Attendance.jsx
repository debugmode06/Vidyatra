import React, { useEffect, useState } from 'react';

// Change this if your backend runs on a different port
const BACKEND_URL = "http://localhost:5000";

export default function FacultyAttendanceSystem() {
  // --- Config / initial data ---
  const [classes, setClasses] = useState(["10"]); // class numbers
  const [sections, setSections] = useState(["A","B"]);

  // --- Form state ---
  const [selectedClass, setSelectedClass] = useState("10");
  const [selectedSection, setSelectedSection] = useState("A");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10));
  const [dayName, setDayName] = useState(() => new Date().toLocaleDateString(undefined,{ weekday: 'long'}));
  const [timeFrom, setTimeFrom] = useState('09:00');
  const [timeTo, setTimeTo] = useState('09:45');
  const [facultyName, setFacultyName] = useState('');

  // --- Attendance data ---
  const [attendance, setAttendance] = useState([]);
  const [activeTab, setActiveTab] = useState('present'); // present | absent
  const [loading, setLoading] = useState(false);

  // --- Register modal ---
  const [showRegister, setShowRegister] = useState(false);
  const [regName, setRegName] = useState('');
  const [regNo, setRegNo] = useState('');
  const [regPhoto, setRegPhoto] = useState(null);
  const [message, setMessage] = useState('');

  // --- Effects ---
  useEffect(()=>{
    setDayName(new Date(date).toLocaleDateString(undefined,{ weekday: 'long'}));
  },[date]);

  // --- Load attendance ---
  async function loadAttendance() {
    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_URL}/api/attendance?class=${selectedClass}&section=${selectedSection}&date=${date}`);
      if (res.ok) {
        const data = await res.json();
        setAttendance(data.attendance || []);
      } else {
        setAttendance([]);
      }
    } catch (e) {
      console.error(e);
      setAttendance([]);
    } finally { setLoading(false); }
  }

  useEffect(()=>{ loadAttendance(); }, [selectedClass, selectedSection, date]);

  // --- Take attendance via face recognition ---
  async function handleTakeAttendance() {
    try {
      setLoading(true);
      setMessage('Running face recognition — ensure camera/service is online');

      const body = { class: selectedClass, section: selectedSection, date, timeFrom, timeTo, facultyName };

      const res = await fetch(`${BACKEND_URL}/api/attendance/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!res.ok) throw new Error('Server error while running recognition');

      const result = await res.json();
      setAttendance(result.attendance || []);
      setMessage('Attendance captured successfully');
    } catch (err) {
      console.error(err);
      setMessage('Failed to run recognition — check server logs');
    } finally { setLoading(false); }
  }

  // --- Register user ---
  async function handleRegister(e) {
    e.preventDefault();
    if (!regName || !regNo || !regPhoto) { setMessage('Provide name, reg no and photo'); return; }

    const fd = new FormData();
    fd.append('name', regName);
    fd.append('regNo', regNo);
    fd.append('photo', regPhoto);

    try {
      const res = await fetch(`${BACKEND_URL}/api/register`, { method: 'POST', body: fd });
      if (!res.ok) throw new Error('Register failed');
      const json = await res.json();
      setMessage('Registered successfully');
      setShowRegister(false);
      setRegName(''); setRegNo(''); setRegPhoto(null);
      // optionally reload attendance/class list
    } catch (err) {
      console.error(err);
      setMessage('Registration failed');
    }
  }

  // --- Update single record ---
  async function updateStatus(regNo, newStatus) {
    try {
      const res = await fetch(`${BACKEND_URL}/api/attendance/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ regNo, status: newStatus, class: selectedClass, section: selectedSection, date })
      });
      if (!res.ok) throw new Error('Update failed');
      setAttendance(prev => prev.map(p => p.regNo === regNo ? { ...p, status: newStatus } : p));
    } catch (err) {
      console.error(err);
      setMessage('Status update failed');
    }
  }

  // --- Export CSV ---
  function handleExport() {
    const url = `${BACKEND_URL}/api/attendance/export?class=${selectedClass}&section=${selectedSection}&date=${date}`;
    window.open(url, '_blank');
  }

  // --- Render ---
  return (
    <div className="space-y-6 p-6">
      <h2 className="text-3xl font-bold text-blue-700">Attendance Manager</h2>

      {/* Session Details */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4">Session Details</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label>Dept</label>
            <select value={selectedClass} onChange={e=>setSelectedClass(e.target.value)} className="mt-1 p-3 border rounded w-full">
              {classes.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label>Section</label>
            <select value={selectedSection} onChange={e=>setSelectedSection(e.target.value)} className="mt-1 p-3 border rounded w-full">
              {sections.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label>Date</label>
            <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="mt-1 p-3 border rounded w-full" />
          </div>

          <div>
            <label>Day</label>
            <input value={dayName} readOnly className="mt-1 p-3 border rounded w-full bg-gray-50" />
          </div>

          <div>
            <label>Time From</label>
            <input type="time" value={timeFrom} onChange={e=>setTimeFrom(e.target.value)} className="mt-1 p-3 border rounded w-full" />
          </div>

          <div>
            <label>Time To</label>
            <input type="time" value={timeTo} onChange={e=>setTimeTo(e.target.value)} className="mt-1 p-3 border rounded w-full" />
          </div>

          <div className="sm:col-span-2">
            <label>Faculty Name</label>
            <input value={facultyName} onChange={e=>setFacultyName(e.target.value)} placeholder="Enter faculty name" className="mt-1 p-3 border rounded w-full" />
          </div>

          <div className="flex items-end gap-3">
            <button onClick={handleTakeAttendance} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg">Take Attendance</button>
            <button onClick={()=>setShowRegister(true)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg">Register</button>
          </div>
        </div>

        <p className="mt-3 text-sm text-gray-600">{message}</p>
      </div>

      {/* Present / Absent Tabs */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex gap-4 mb-4">
          <button className={`px-4 py-2 rounded ${activeTab==='present'? 'bg-blue-600 text-white':'bg-gray-100'}`} onClick={()=>setActiveTab('present')}>Present</button>
          <button className={`px-4 py-2 rounded ${activeTab==='absent'? 'bg-blue-600 text-white':'bg-gray-100'}`} onClick={()=>setActiveTab('absent')}>Absent</button>
          <button className="ml-auto px-4 py-2 rounded bg-gray-200" onClick={handleExport}>Export CSV</button>
        </div>

        {loading ? <p>Loading...</p> : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="p-3">Name</th>
                <th className="p-3">Reg No</th>
                <th className="p-3">Status</th>
                <th className="p-3">Time Marked</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {attendance.filter(a => activeTab==='present' ? a.status!=='absent' : a.status==='absent').map((a,i) => (
                <tr key={i} className="border-b">
                  <td className="p-3">{a.name}</td>
                  <td className="p-3">{a.regNo}</td>
                  <td className="p-3">
                    <select value={a.status} onChange={(e)=>updateStatus(a.regNo, e.target.value)} className="p-2 border rounded">
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                      <option value="OD">OD</option>
                      <option value="permission">Permission</option>
                    </select>
                  </td>
                  <td className="p-3">{a.timeMarked || '-'}</td>
                  <td className="p-3">
                    <button onClick={()=>updateStatus(a.regNo, a.status==='absent'?'present':'absent')} className="px-3 py-1 bg-gray-200 rounded">Toggle</button>
                  </td>
                </tr>
              ))}

              {attendance.length===0 && (
                <tr><td colSpan={5} className="p-3 text-center text-gray-500">No records</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Register Modal */}
      {showRegister && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4">Register Person</h3>
            <form onSubmit={handleRegister} className="space-y-3">
              <div>
                <label>Name</label>
                <input value={regName} onChange={e=>setRegName(e.target.value)} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label>Register No</label>
                <input value={regNo} onChange={e=>setRegNo(e.target.value)} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label>Photo</label>
                <input type="file" accept="image/*" onChange={e=>setRegPhoto(e.target.files[0])} className="w-full" />
              </div>

              <div className="flex gap-3">
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
                <button type="button" onClick={()=>setShowRegister(false)} className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
              </div>
            </form>
            <p className="mt-2 text-sm text-gray-600">{message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
