import { useEffect, useMemo, useState } from "react";
import "./App.css";

const EMPTY_STUDENT = {
  name: "",
  rollNumber: "",
  email: "",
  phone: "",
  department: "",
  year: "",
  status: "Active",
};

const getInitialStudents = () => {
  try {
    const saved = localStorage.getItem("students");
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed)
      ? parsed.map((student) => ({
          ...student,
          name: String(student.name ?? ""),
          rollNumber: String(student.rollNumber ?? ""),
          email: String(student.email ?? ""),
          phone: String(student.phone ?? ""),
          department: String(student.department ?? ""),
          year: String(student.year ?? ""),
          status: student.status === "Inactive" ? "Inactive" : "Active",
        }))
      : [];
  } catch {
    return [];
  }
};

function App() {
  const [students, setStudents] = useState(getInitialStudents);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [newStudent, setNewStudent] = useState(EMPTY_STUDENT);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const totalStudents = students.length;
  const activeStudents = students.filter((student) => student.status === "Active").length;
  const inactiveStudents = students.filter((student) => student.status === "Inactive").length;

  const filteredStudents = useMemo(() => {
    const searchText = search.trim().toLowerCase();
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchText) ||
        student.rollNumber.toLowerCase().includes(searchText) ||
        student.email.toLowerCase().includes(searchText);
      return (
        matchesSearch &&
        (!departmentFilter || student.department === departmentFilter) &&
        (!yearFilter || student.year === yearFilter) &&
        (!statusFilter || student.status === statusFilter)
      );
    });
  }, [students, search, departmentFilter, yearFilter, statusFilter]);

  const openAddForm = () => {
    setEditingStudent(null);
    setNewStudent(EMPTY_STUDENT);
    setShowForm(true);
    setCurrentPage("add");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewStudent((previous) => ({ ...previous, [name]: value }));
  };

  const handleSaveStudent = (event) => {
    event.preventDefault();

    const cleanedStudent = {
      ...newStudent,
      name: newStudent.name.trim(),
      rollNumber: newStudent.rollNumber.trim(),
      email: newStudent.email.trim(),
      phone: newStudent.phone.trim(),
    };

    if (
      !cleanedStudent.name ||
      !cleanedStudent.rollNumber ||
      !cleanedStudent.email ||
      !cleanedStudent.phone ||
      !cleanedStudent.department ||
      !cleanedStudent.year
    ) {
      window.alert("Please fill all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanedStudent.email)) {
      window.alert("Please enter a valid email address.");
      return;
    }

    if (!/^[0-9]{10}$/.test(cleanedStudent.phone)) {
      window.alert("Phone number must be exactly 10 digits.");
      return;
    }

    const duplicateRoll = students.some(
      (student) =>
        String(student.rollNumber).toLowerCase() === cleanedStudent.rollNumber.toLowerCase() &&
        student.id !== editingStudent?.id
    );

    if (duplicateRoll) {
      window.alert("Roll number already exists!");
      return;
    }

    if (editingStudent) {
      setStudents((previous) =>
        previous.map((student) =>
          student.id === editingStudent.id
            ? { ...cleanedStudent, id: editingStudent.id }
            : student
        )
      );
      window.alert("Student updated successfully!");
    } else {
      setStudents((previous) => [...previous, { ...cleanedStudent, id: Date.now() }]);
      window.alert("Student added successfully!");
    }

    setNewStudent(EMPTY_STUDENT);
    setEditingStudent(null);
    setShowForm(false);
    setCurrentPage("dashboard");
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setNewStudent({ ...EMPTY_STUDENT, ...student });
    setShowForm(true);
    setCurrentPage("add");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents((previous) => previous.filter((student) => student.id !== id));
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    setShowForm(page === "add");
    if (page !== "add") {
      setEditingStudent(null);
      setNewStudent(EMPTY_STUDENT);
    }
  };

  const pageTitle = showForm
    ? editingStudent ? "Edit Student" : "Add Student"
    : currentPage === "students" ? "Students" : "Dashboard";

  const recentStudents = [...students].slice(-5).reverse();

  return (
    <div className="app">
            <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon" aria-hidden="true">🎓</div>
          <div className="logo-text">
            <strong>Student</strong>
            <strong>Management</strong>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          <button className={`nav-item ${currentPage === "dashboard" && !showForm ? "active" : ""}`} onClick={() => goToPage("dashboard")}>
            <span className="nav-icon">⌂</span><span className="nav-label">Dashboard</span>
          </button>
          <button className={`nav-item ${currentPage === "students" && !showForm ? "active" : ""}`} onClick={() => goToPage("students")}>
            <span className="nav-icon">♧</span><span className="nav-label">Students</span>
          </button>
          <button className={`nav-item ${showForm ? "active" : ""}`} onClick={openAddForm}>
            <span className="nav-icon">⊞</span><span className="nav-label">Add Student</span>
                        </button>
        </nav>

        <div className="sidebar-bottom">
          <button className="nav-item" type="button" onClick={() => window.alert("Settings are not available in this version.")}>
            <span className="nav-icon">⚙</span><span className="nav-label">Settings</span>
          </button>
          <button className="nav-item" type="button" onClick={() => window.alert("Logout is not available in this version.")}>
            <span className="nav-icon">⇥</span><span className="nav-label">Logout</span>
          </button>
                </div>
      </aside>

          <main className="main">
        <header className="header">
          <div className="header-title">
            <h3>{pageTitle}</h3>
            <p>{showForm ? "Enter and manage student information" : currentPage === "students" ? "View and manage all registered students" : "Overview of your student management system"}</p>
          </div>
          <div className="header-tools">
            <label className="global-search">
              <span className="search-icon" aria-hidden="true">⌕</span>
              <input
                aria-label="Search students"
                placeholder="Search students, roll number, email..."
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  if (currentPage !== "students" && !showForm) setCurrentPage("students");
                }}
              />
            </label>
            <button className="notification-button" type="button" aria-label="Notifications" onClick={() => window.alert("You are all caught up!")}>
              ♧<span className="notification-dot" />
            </button>
            <div className="profile">
              <div className="profile-circle">LP</div>
              <span>Limsi Patel</span>
              <span className="profile-chevron">⌄</span>
                  </div>
          </div>
        </header>

        {!showForm && currentPage === "dashboard" && (
          <section className="dashboard">
            <div className="welcome-row">
              <div className="welcome-banner">
                <div className="welcome-copy">
                  <span className="welcome-kicker">STUDENT PORTAL · OVERVIEW</span>
                  <h1><span>Welcome back,</span> Limsi! <span className="wave">👋</span></h1>
                  <p>Manage your students efficiently and keep track of all the information in one place.</p>
                </div>
                <div className="graduation-art" aria-hidden="true">
                  <span className="art-spark spark-one">✦</span>
                  <span className="art-spark spark-two">✦</span>
                  <div className="cap-board" />
                  <div className="cap-top" />
                  <div className="cap-tassel" />
                  <div className="book book-bottom" />
                  <div className="book book-middle" />
                  <div className="book book-top" />
                      </div>
              </div>

              <div className="quick-actions">
                <div className="quick-heading">
                  <div className="quick-icon">ϟ</div>
                  <div><h2>Quick Actions</h2><p>Manage students quickly</p></div>
                </div>
                <button className="quick-add-button" onClick={openAddForm}>
                  <span>＋</span> Add New Student
                </button>
              </div>
            </div>

            <div className="stats">
              <div className="stat-card total-card">
                <div className="stat-symbol blue">♟</div>
                <div className="stat-content"><p>Total Students</p><h2>{totalStudents}</h2></div>
                <div className="mini-bars blue-bars" aria-hidden="true"><i /><i /><i /><i /></div>
              </div>
              <div className="stat-card active-card">
                <div className="stat-symbol green">✓</div>
                <div className="stat-content"><p>Active Students</p><h2>{activeStudents}</h2></div>
                <div className="mini-bars green-bars" aria-hidden="true"><i /><i /><i /><i /></div>
              </div>
              <div className="stat-card inactive-card">
                <div className="stat-symbol red">●</div>
                <div className="stat-content"><p>Inactive Students</p><h2>{inactiveStudents}</h2></div>
                <div className="mini-bars red-bars" aria-hidden="true"><i /><i /><i /><i /></div>
              </div>
            </div>

            <div className="table-card">
              <div className="table-header">
                <div className="recent-title-wrap">
                  <div className="recent-heading-icon">◷</div>
                  <div><h2>Recent Students</h2><p>Here are the most recently added students.</p></div>
                </div>
                <button className="view-all-button" onClick={() => goToPage("students")}>View all <span>→</span></button>
              </div>
              <table className="recent-table">
                <thead><tr><th>#</th><th>Name</th><th>Roll Number</th><th>Email</th><th>Department</th><th>Year</th><th>Status</th></tr></thead>
                <tbody>
                  {recentStudents.length ? recentStudents.map((student, index) => (
                    <tr key={student.id ?? `${student.rollNumber}-${index}`}>
                      <td>{index + 1}</td>
                      <td><div className="recent-name"><div className="student-avatar">{student.name.charAt(0).toUpperCase() || "S"}</div><span>{student.name}</span></div></td>
                      <td>{student.rollNumber}</td>
                      <td className="email-cell">{student.email}</td>
                      <td>{student.department}</td>
                      <td>{student.year}</td>
                      <td><span className={student.status === "Active" ? "active-badge" : "inactive-badge"}><span className="status-dot" />{student.status}</span></td>
                    </tr>
                  )) : <tr><td colSpan="7" className="empty-message">No students added yet. Click “Add New Student” to get started.</td></tr>}
                </tbody>
              </table>
            </div>
                  </section>
                          )}

          {!showForm && currentPage === "students" && (
          <section className="students-page">
            <div className="page-top">
              <div><h1>Students</h1><p>Manage all registered students in one place.</p></div>
                  <button className="primary-button" onClick={openAddForm}>＋ Add Student</button>
            </div>
            <div className="filters">
              <input placeholder="Search name, roll number or email..." value={search} onChange={(event) => setSearch(event.target.value)} />
              <select value={departmentFilter} onChange={(event) => setDepartmentFilter(event.target.value)}>
                <option value="">All Departments</option><option>Computer</option><option>IT</option><option>Mechanical</option><option>Civil</option>
              </select>
              <select value={yearFilter} onChange={(event) => setYearFilter(event.target.value)}>
                <option value="">All Years</option><option value="1">1st Year</option><option value="2">2nd Year</option><option value="3">3rd Year</option><option value="4">4th Year</option>
              </select>
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                <option value="">All Status</option><option value="Active">Active</option><option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="table-card">
              <table className="students-table">
                <thead><tr><th>#</th><th>Name</th><th>Roll Number</th><th>Email</th><th>Phone</th><th>Department</th><th>Year</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  {filteredStudents.length ? filteredStudents.map((student, index) => (
                    <tr key={student.id}>
                      <td>{index + 1}</td><td>{student.name}</td><td>{student.rollNumber}</td><td>{student.email}</td><td>{student.phone}</td><td>{student.department}</td><td>{student.year}</td>
                      <td><span className={student.status === "Active" ? "active-badge" : "inactive-badge"}><span className="status-dot" />{student.status}</span></td>
                      <td className="action-cell"><button className="edit-btn" onClick={() => handleEdit(student)}>Edit</button><button className="delete-btn" onClick={() => handleDelete(student.id)}>Delete</button></td>
                    </tr>
                  )) : <tr><td colSpan="9" className="empty-message">No students match your search or filters.</td></tr>}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {showForm && (
          <section className="add-page">
            <div className="add-banner">
              <div><span className="small-title">STUDENT MANAGEMENT SYSTEM</span><h1>{editingStudent ? "Edit Student Details" : "Add New Student"}</h1><p>{editingStudent ? "Update the student information below." : "Fill in the details to add a new student to the system."}</p></div>
              <div className="banner-icon" aria-hidden="true">🎓</div>
            </div>
            <div className="form-card">
              <div className="form-heading"><div className="form-icon">▣</div><div><h2>{editingStudent ? "Edit Student" : "Student Information"}</h2><p>Enter the student details below.</p></div></div>
              <form onSubmit={handleSaveStudent}>
                <div className="form-grid">
                  <div className="input-group"><label htmlFor="name">Name <span>*</span></label><input id="name" name="name" value={newStudent.name} onChange={handleChange} placeholder="Enter full name" required /></div>
                  <div className="input-group"><label htmlFor="rollNumber">Roll Number <span>*</span></label><input id="rollNumber" name="rollNumber" value={newStudent.rollNumber} onChange={handleChange} placeholder="Enter roll number" required /></div>
                  <div className="input-group"><label htmlFor="email">Email <span>*</span></label><input id="email" name="email" type="email" value={newStudent.email} onChange={handleChange} placeholder="Enter email address" required /></div>
                  <div className="input-group"><label htmlFor="phone">Phone <span>*</span></label><input id="phone" name="phone" type="tel" inputMode="numeric" maxLength="10" value={newStudent.phone} onChange={handleChange} placeholder="Enter 10-digit phone number" required /></div>
                  <div className="input-group"><label htmlFor="department">Department <span>*</span></label><select id="department" name="department" value={newStudent.department} onChange={handleChange} required><option value="">Select Department</option><option value="Computer">Computer</option><option value="IT">IT</option><option value="Mechanical">Mechanical</option><option value="Civil">Civil</option></select></div>
                  <div className="input-group"><label htmlFor="year">Year <span>*</span></label><select id="year" name="year" value={newStudent.year} onChange={handleChange} required><option value="">Select Year</option><option value="1">1st Year</option><option value="2">2nd Year</option><option value="3">3rd Year</option><option value="4">4th Year</option></select></div>
                </div>
                <div className="status-section"><label className="status-title">Status <span>*</span></label><div className="status-options">
                  <label className={`status-option ${newStudent.status === "Active" ? "selected" : ""}`}><input type="radio" name="status" value="Active" checked={newStudent.status === "Active"} onChange={handleChange} /><span>Active</span></label>
                  <label className={`status-option ${newStudent.status === "Inactive" ? "selected" : ""}`}><input type="radio" name="status" value="Inactive" checked={newStudent.status === "Inactive"} onChange={handleChange} /><span>Inactive</span></label>
                </div></div>
                <div className="form-actions"><button type="submit" className="save-button">▣ &nbsp; {editingStudent ? "Update Student" : "Save Student"}</button><button type="button" className="cancel-button" onClick={() => goToPage("dashboard")}>Cancel</button></div>
              </form>
            </div>
            </section>
        )}
          </main>
    </div>
  );
}

export default App;
