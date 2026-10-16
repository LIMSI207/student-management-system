
import { useEffect, useMemo, useState } from "react";
import "./App.css";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import StudentTable from "./components/StudentTable";
import StudentForm from "./components/StudentForm";
import Toast from "./components/Toast";
import ConfirmDialog from "./components/ConfirmDialog";
import {
  loadStudentsFromStorage,
  saveStudentsToStorage,
  createUniqueStudentId,
} from "./utils/students";

const emptyStudent = {
  name: "",
  rollNumber: "",
  email: "",
  phone: "",
  department: "",
  year: "",
  status: "Active",
};

function App() {
  const [students, setStudents] = useState(() =>
    loadStudentsFromStorage()
  );
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [newStudent, setNewStudent] = useState(emptyStudent);

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [toast, setToast] = useState(null);
  const [deleteStudent, setDeleteStudent] = useState(null);

  useEffect(() => {
  const saved = saveStudentsToStorage(students);

  if (!saved) {
    showMessage(
      "Unable to save student data. Please check browser storage.",
      "error"
    );
  }
}, [students]);

  const showMessage = (message, type = "success") => {
    setToast({ message, type });
    window.setTimeout(() => setToast(null), 3000);
  };

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return students.filter((student) => {
      const matchesSearch =
        (student.name || "").toLowerCase().includes(query) ||
        String(student.rollNumber || "")
          .toLowerCase()
          .includes(query) ||
        (student.email || "").toLowerCase().includes(query);

      const matchesDepartment =
        departmentFilter === "All" ||
        student.department === departmentFilter;

      const matchesYear =
        yearFilter === "All" ||
        String(student.year) === String(yearFilter);

      const matchesStatus =
        statusFilter === "All" ||
        student.status === statusFilter;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesYear &&
        matchesStatus
      );
    });
  }, [
    students,
    search,
    departmentFilter,
    yearFilter,
    statusFilter,
  ]);

  const openAddForm = () => {
    setEditingStudent(null);
    setNewStudent({ ...emptyStudent });
    setShowForm(true);
  };

  const openEditForm = (student) => {
    setEditingStudent(student);
    setNewStudent({ ...student });
    setShowForm(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = newStudent.name.trim();
    const rollNumber = String(newStudent.rollNumber).trim();
    const email = newStudent.email.trim();
    const phone = String(newStudent.phone).trim();

    if (!name || !rollNumber || !email || !phone) {
      showMessage("Please fill in all required fields.", "error");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showMessage("Please enter a valid email address.", "error");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      showMessage("Phone number must contain 10 digits.", "error");
      return;
    }

    const duplicateRollNumber = students.some(
      (student) =>
        String(student.rollNumber).toLowerCase() ===
          rollNumber.toLowerCase() &&
        student.id !== editingStudent?.id
    );

    if (duplicateRollNumber) {
      showMessage("This roll number already exists.", "error");
      return;
    }

    if (editingStudent) {
      setStudents((previous) =>
        previous.map((student) =>
          student.id === editingStudent.id
            ? { ...newStudent, id: editingStudent.id, name, rollNumber, email, phone }
            : student
        )
      );
      showMessage("Student updated successfully!");
    } else {
      const studentToAdd = {
        ...newStudent,
        id: createUniqueStudentId(students),
        name,
        rollNumber,
        email,
        phone,
      };

      setStudents((previous) => [...previous, studentToAdd]);
      showMessage("Student added successfully!");
    }

    setShowForm(false);
    setEditingStudent(null);
    setNewStudent({ ...emptyStudent });
  };

  const handleDelete = () => {
    if (!deleteStudent) return;

    setStudents((previous) =>
      previous.filter((student) => student.id !== deleteStudent.id)
    );

    setDeleteStudent(null);
    showMessage("Student deleted successfully!");
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setShowForm(false);
    setSearch("");
  };

  return (
    <div className="app">
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={handleNavigation}
      />

      <main className="main-content">
        <Header
          currentPage={currentPage}
          search={search}
          setSearch={setSearch}
        />

        {showForm ? (
          <StudentForm
            student={newStudent}
            editing={Boolean(editingStudent)}
            onChange={setNewStudent}
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
          />
        ) : currentPage === "Dashboard" ? (
          <Dashboard
  students={students}
  filteredStudents={filteredStudents}
  onAddStudent={openAddForm}
  onViewStudents={() => handleNavigation("Students")}
/>
        ) : (
          <StudentTable
            students={filteredStudents}
            departmentFilter={departmentFilter}
            setDepartmentFilter={setDepartmentFilter}
            yearFilter={yearFilter}
            setYearFilter={setYearFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            onAddStudent={openAddForm}
            onEditStudent={openEditForm}
            onDeleteStudent={setDeleteStudent}
          />
        )}
      </main>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {deleteStudent && (
        <ConfirmDialog
          title="Delete Student?"
          message={`Are you sure you want to delete ${deleteStudent.name}?`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteStudent(null)}
        />
      )}
    </div>
  );
}

export default App;
