import { useState } from "react";
import "./App.css";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const [currentPage, setCurrentPage] = useState("dashboard");

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Aarti Sharma",
      rollNumber: "CE001",
      email: "aarti@gmail.com",
      phone: "9876543210",
      department: "Computer",
      year: "2",
      status: "Active",
    },
    {
      id: 2,
      name: "Rahul Mehta",
      rollNumber: "IT005",
      email: "rahul@gmail.com",
      phone: "9876543211",
      department: "IT",
      year: "3",
      status: "Active",
    },
    {
      id: 3,
      name: "Priya Patel",
      rollNumber: "CE010",
      email: "priya@gmail.com",
      phone: "9876543212",
      department: "Computer",
      year: "1",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Dhruv Patel",
      rollNumber: "ME003",
      email: "dhruv@gmail.com",
      phone: "9876543213",
      department: "Mechanical",
      year: "2",
      status: "Active",
    },
  ]);

  const [newStudent, setNewStudent] = useState({
    name: "",
    rollNumber: "",
    email: "",
    phone: "",
    department: "",
    year: "",
    status: "Active",
  });

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const totalStudents = students.length;

  const activeStudents = students.filter(
    (student) => student.status === "Active"
  ).length;

  const inactiveStudents = students.filter(
    (student) => student.status === "Inactive"
  ).length;

  const filteredStudents = students.filter((student) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      student.name.toLowerCase().includes(searchText) ||
      student.rollNumber.toLowerCase().includes(searchText) ||
      student.email.toLowerCase().includes(searchText);

    const matchesDepartment =
      departmentFilter === "" ||
      student.department === departmentFilter;

    const matchesYear =
      yearFilter === "" || student.year === yearFilter;

    const matchesStatus =
      statusFilter === "" || student.status === statusFilter;

    return (
      matchesSearch &&
      matchesDepartment &&
      matchesYear &&
      matchesStatus
    );
  });

  const handleChange = (e) => {
    setNewStudent({
      ...newStudent,
      [e.target.name]: e.target.value,
    });
  };
  const handleSaveStudent = (e) => {
  e.preventDefault();

  if (
    !newStudent.name ||
    !newStudent.rollNumber ||
    !newStudent.email ||
    !newStudent.phone ||
    !newStudent.department ||
    !newStudent.year
  ) {
    alert("Please fill all required fields.");
    return;
  }

  // Duplicate Roll Number check
  const duplicateRoll = students.some(
    (student) =>
      student.rollNumber.toLowerCase() ===
        newStudent.rollNumber.toLowerCase() &&
      student.id !== editingStudent?.id
  );

  if (duplicateRoll) {
    alert("Roll number already exists!");
    return;
  }

  // EDIT / UPDATE
  if (editingStudent) {
    setStudents(
      students.map((student) =>
        student.id === editingStudent.id
          ? {
              ...newStudent,
              id: editingStudent.id,
            }
          : student
      )
    );

    alert("Student updated successfully!");
  }

  // ADD NEW STUDENT
  else {
    const student = {
      ...newStudent,
      id: Date.now(),
    };

    setStudents([...students, student]);

    alert("Student added successfully!");
  }

  // Reset form
  setNewStudent({
    name: "",
    rollNumber: "",
    email: "",
    phone: "",
    department: "",
    year: "",
    status: "Active",
  });

  setEditingStudent(null);
  setShowForm(false);
  setCurrentPage("students");
};

  
  
   

  
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (confirmDelete) {
      setStudents(
        students.filter((student) => student.id !== id)
      );
    }
  };
  const handleEdit = (student) => {
  setEditingStudent(student);
  setNewStudent(student);
  setShowForm(true);
  setCurrentPage("add");
};

  return (
    <div className="app">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="logo">
          <div className="logo-icon">🎓</div>

          <div>
            <strong>Student</strong>
            <strong>Management</strong>
          </div>
        </div>

        <nav>

          {/* DASHBOARD */}
          <div
            className={`nav-item ${
              currentPage === "dashboard" && !showForm
                ? "active"
                : ""
            }`}
            onClick={() => {
              setCurrentPage("dashboard");
              setShowForm(false);
            }}
          >
            <span>⌂</span>
            Dashboard
          </div>

          {/* STUDENTS */}
          <div
            className={`nav-item ${
              currentPage === "students" && !showForm
                ? "active"
                : ""
            }`}
            onClick={() => {
              setCurrentPage("students");
              setShowForm(false);
            }}
          >
            <span>👥</span>
            Students
          </div>

          {/* ADD STUDENT */}
          <div
            className={`nav-item ${
              showForm ? "active" : ""
            }`}
            onClick={() => {
              setShowForm(true);
              setCurrentPage("add");
            }}
          >
            <span>⊞</span>
            Add Student
          </div>

        </nav>

        <div className="sidebar-bottom">

          <div className="nav-item">
            <span>⚙</span>
            Settings
          </div>

          <div className="nav-item">
            <span>⇥</span>
            Logout
          </div>

        </div>

      </aside>

      {/* MAIN */}
      <main className="main">

        {/* HEADER */}
        <header className="header">

          <h3>
            {showForm
              ? "Add Student"
              : currentPage === "students"
              ? "Students"
              : "Dashboard"}
          </h3>

          <div className="profile">

            <div className="profile-circle">
              L
            </div>

            <span>Limsi Patel</span>
            <span>⌄</span>

          </div>

        </header>

        {/* ================= ADD STUDENT ================= */}

        {showForm && (

          <section className="add-page">

            <div className="add-banner">

              <div>

                <span className="small-title">
                  STUDENT MANAGEMENT SYSTEM
                </span>

                <h1>Add New Student</h1>

                <p>
                  Fill in the details to add a new student
                  to the system.
                </p>

              </div>

              <div className="banner-icon">
                🎓
              </div>

            </div>

            <div className="form-card">

              <div className="form-heading">

                <div className="form-icon">
                  ▣
                </div>

                <div>
                  <h2>Add New Student</h2>

                  <p>
                    Enter student details below.
                  </p>
                </div>

              </div>

              <form onSubmit={handleSaveStudent}>

                <div className="form-grid">

                  {/* NAME */}
                  <div className="input-group">

                    <label>
                      Name <span>*</span>
                    </label>

                    <input
                      type="text"
                      name="name"
                      placeholder="Enter full name"
                      value={newStudent.name}
                      onChange={handleChange}
                    />

                  </div>

                  {/* ROLL NUMBER */}
                  <div className="input-group">

                    <label>
                      Roll Number <span>*</span>
                    </label>

                    <input
                      type="text"
                      name="rollNumber"
                      placeholder="Enter roll number"
                      value={newStudent.rollNumber}
                      onChange={handleChange}
                    />

                  </div>

                  {/* EMAIL */}
                  <div className="input-group">

                    <label>
                      Email <span>*</span>
                    </label>

                    <input
                      type="email"
                      name="email"
                      placeholder="Enter email address"
                      value={newStudent.email}
                      onChange={handleChange}
                    />

                  </div>

                  {/* PHONE */}
                  <div className="input-group">

                    <label>
                      Phone <span>*</span>
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter phone number"
                      value={newStudent.phone}
                      onChange={handleChange}
                    />

                  </div>

                  {/* DEPARTMENT */}
                  <div className="input-group">

                    <label>
                      Department <span>*</span>
                    </label>

                    <select
                      name="department"
                      value={newStudent.department}
                      onChange={handleChange}
                    >

                      <option value="">
                        Select Department
                      </option>

                      <option value="Computer">
                        Computer
                      </option>

                      <option value="IT">
                        IT
                      </option>

                      <option value="Mechanical">
                        Mechanical
                      </option>

                      <option value="Civil">
                        Civil
                      </option>

                    </select>

                  </div>

                  {/* YEAR */}
                  <div className="input-group">

                    <label>
                      Year <span>*</span>
                    </label>

                    <select
                      name="year"
                      value={newStudent.year}
                      onChange={handleChange}
                    >

                      <option value="">
                        Select Year
                      </option>

                      <option value="1">
                        1st Year
                      </option>

                      <option value="2">
                        2nd Year
                      </option>

                      <option value="3">
                        3rd Year
                      </option>

                      <option value="4">
                        4th Year
                      </option>

                    </select>

                  </div>

                </div>

                {/* STATUS */}
                <div className="status-section">

                  <label className="status-title">
                    Status <span>*</span>
                  </label>

                  <div className="status-options">

                    <label className="status-option">

                      <input
                        type="radio"
                        name="status"
                        value="Active"
                        checked={
                          newStudent.status === "Active"
                        }
                        onChange={handleChange}
                      />

                      <span>Active</span>

                    </label>

                    <label className="status-option">

                      <input
                        type="radio"
                        name="status"
                        value="Inactive"
                        checked={
                          newStudent.status === "Inactive"
                        }
                        onChange={handleChange}
                      />

                      <span>Inactive</span>

                    </label>

                  </div>

                </div>

                {/* BUTTONS */}
                <div className="form-actions">

                  <button
                    type="submit"
                    className="save-button"
                  >
                    ▣ &nbsp; Save Student
                  </button>

                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => {
                      setShowForm(false);
                      setCurrentPage("dashboard");
                    }}
                  >
                    Cancel
                  </button>

                </div>

              </form>

            </div>

          </section>

        )}

        {/* ================= STUDENTS PAGE ================= */}

        {!showForm && currentPage === "students" && (

          <section className="students-page">

            <div className="page-top">

              <div>
                <h1>Students</h1>

                <p>
                  Manage all registered students
                </p>
              </div>


            </div>

            {/* SEARCH + FILTERS */}
            <div className="filters">

              <input
                type="text"
                placeholder="Search name, roll number or email..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

              <select
                value={departmentFilter}
                onChange={(e) =>
                  setDepartmentFilter(e.target.value)
                }
              >
                <option value="">
                  All Departments
                </option>

                <option value="Computer">
                  Computer
                </option>

                <option value="IT">
                  IT
                </option>

                <option value="Mechanical">
                  Mechanical
                </option>

                <option value="Civil">
                  Civil
                </option>

              </select>

              <select
                value={yearFilter}
                onChange={(e) =>
                  setYearFilter(e.target.value)
                }
              >

                <option value="">
                  All Years
                </option>

                <option value="1">
                  1st Year
                </option>

                <option value="2">
                  2nd Year
                </option>

                <option value="3">
                  3rd Year
                </option>

                <option value="4">
                  4th Year
                </option>

              </select>

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
              >

                <option value="">
                  All Status
                </option>

                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>

              </select>

            </div>

            {/* STUDENT TABLE */}
            <div className="table-card">

              <table>

                <thead>

                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Roll Number</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Department</th>
                    <th>Year</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>

                </thead>

                <tbody>

                  {filteredStudents.length > 0 ? (

                    filteredStudents.map(
                      (student, index) => (

                        <tr key={student.id}>

                          <td>{index + 1}</td>

                          <td>{student.name}</td>

                          <td>{student.rollNumber}</td>

                          <td>{student.email}</td>

                          <td>{student.phone}</td>

                          <td>{student.department}</td>

                          <td>{student.year}</td>

                          <td>

                            <span
                              className={
                                student.status === "Active"
                                  ? "active-badge"
                                  : "inactive-badge"
                              }
                            >
                              {student.status}
                            </span>

                          </td>

                          <td>

                            <button
                              className="edit-btn"
                              onClick={() =>
                                handleEdit(student)}
                            >
                              Edit
                            </button>

                            <button
                              className="delete-btn"
                              onClick={() =>
                                handleDelete(student.id)
                              }
                            >
                              Delete
                            </button>

                          </td>

                        </tr>

                      )
                    )

                  ) : (

                    <tr>

                      <td colSpan="9">
                        No students found
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </section>

        )}

        {/* ================= DASHBOARD ================= */}

        {!showForm && currentPage === "dashboard" && (

          <section className="dashboard">

            <h1>
              Welcome to Student Management System
            </h1>

            <p>
              Manage your students efficiently
            </p>

            {/* STATISTICS */}

            <div className="stats">

              <div className="stat-card">

                <div className="stat-icon blue">
                  👥
                </div>

                <p>Total Students</p>

                <h2>{totalStudents}</h2>

              </div>

              <div className="stat-card">

                <div className="stat-icon green">
                  ✓
                </div>

                <p>Active Students</p>

                <h2>{activeStudents}</h2>

              </div>

              <div className="stat-card">

                <div className="stat-icon red">
                  👤
                </div>

                <p>Inactive Students</p>

                <h2>{inactiveStudents}</h2>

              </div>

            </div>

            {/* RECENT STUDENTS */}

            <div className="table-card">

              <div className="table-header">

                <h2>Recent Students</h2>

                <button
                  onClick={() => {
                    setCurrentPage("students");
                    setShowForm(false);
                  }}
                >
                  View All
                </button>

              </div>

              <table>

                <thead>

                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Roll Number</th>
                    <th>Department</th>
                    <th>Year</th>
                    <th>Status</th>
                  </tr>

                </thead>

                <tbody>

                  {students.map(
                    (student, index) => (

                      <tr key={student.id}>

                        <td>{index + 1}</td>

                        <td>{student.name}</td>

                        <td>{student.rollNumber}</td>

                        <td>{student.department}</td>

                        <td>{student.year}</td>

                        <td>

                          <span
                            className={
                              student.status === "Active"
                                ? "active-badge"
                                : "inactive-badge"
                            }
                          >
                            {student.status}
                          </span>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          </section>

        )}

      </main>

    </div>
  );
}

export default App;