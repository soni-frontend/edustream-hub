import React, { useState } from 'react'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [newName, setNewName] = useState("");
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState([
    { id: 1, name: "Soni Kumari", attendance: "Present" },
    { id: 2, name: "Khushi Kumari", attendance: "Absent" },
    { id: 3, name: "Riya Kumari", attendance: "Present" },
    { id: 4, name: "Suman Kumari", attendance: "Absent" },
    { id: 5, name: "Rohan Kumar", attendance: "Present" },
    { id: 6, name: "Krish Kumar", attendance: "Absent" }
  ]);

  // 1. Stats Calculation
  const totalStudents = students.length;
  const presentCount = students.filter(s => s.attendance === "Present").length;
  const absentCount = students.filter(s => s.attendance === "Absent").length;

  // 2. Add Student Logic
  const addStudent = (e) => {
    e.preventDefault();
    if (newName.trim() === "") return;
    const newStudent = {
      id: students.length + 1,
      name: newName,
      attendance: "Present"
    };
    setStudents([...students, newStudent]);
    setNewName("");
  };

  // 3. Toggle Attendance Logic
  const toggleAttendance = (id) => {
    setStudents(students.map(s => 
      s.id === id ? { ...s, attendance: s.attendance === "Present" ? "Absent" : "Present" } : s
    ));
  };

  // 4. CSV Download Logic
  const downloadCSV = () => {
    const header = `Attendance Report for Date: ${attendanceDate}\nID, Name, Attendance\n`;
    const rows = students.map(s => `${s.id}, ${s.name}, ${s.attendance}`).join("\n");
    const csvContent = "data:text/csv;charset=utf-8," + header + rows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Attendance_${attendanceDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="header">
        <h1>Professor Management Tool</h1>
        <p>Edustream Hub - College Project</p>
      </div>

      {/* Stats Section */}
      <div className="stats-container">
        <div className="stat-box">
          <span>Total Students</span>
          <h3>{totalStudents}</h3>
        </div>
        <div className="stat-box present-box">
          <span>Present</span>
          <h3>{presentCount}</h3>
        </div>
        <div className="stat-box absent-box">
          <span>Absent</span>
          <h3>{absentCount}</h3>
        </div>
      </div>

      {/* Date Picker */}
      <div className="date-picker-container">
        <label>Date: </label>
        <input 
          type="date" 
          value={attendanceDate} 
          onChange={(e) => setAttendanceDate(e.target.value)}
          className="date-input"
        />
      </div>

      <div className="action-row">
        <form className="add-student-form" onSubmit={addStudent}>
          <input 
            type="text" 
            placeholder="New Student Name..." 
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="add-input"
          />
          <button type="submit" className="btn-add">Add</button>
        </form>
        
        <button onClick={downloadCSV} className="btn-download">
          Download CSV
        </button>
      </div>

      <input 
        type="text" 
        placeholder="Search Student..." 
        className="search-bar" 
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="attendance-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>
                <span className={`status-badge ${student.attendance.toLowerCase()}`}>
                  {student.attendance}
                </span>
              </td>
              <td>
                <button onClick={() => toggleAttendance(student.id)} className="btn-toggle">
                  Toggle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
