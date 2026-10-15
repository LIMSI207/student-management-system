export default function Dashboard({
  students,
    filteredStudents,
  onAddStudent,
  onViewStudents,
}) {
  const totalStudents = students.length;

  const activeStudents = students.filter(
    (student) => student.status === "Active"
  ).length;

  const inactiveStudents = students.filter(
    (student) => student.status === "Inactive"
  ).length;

  const recentStudents = [...filteredStudents].slice(-5).reverse();

  return (
    <div className="dashboard">
      <div className="dashboard-welcome">
        <div>
          <h2>Dashboard Overview</h2>
          <p>Here's what's happening with your students.</p>
        </div>

        <button type="button" onClick={onAddStudent}>
          + Add New Student
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">🎓</span>
          <p>Total Students</p>
          <h2>{totalStudents}</h2>
        </div>

        <div className="stat-card">
          <span className="stat-icon">✅</span>
          <p>Active Students</p>
          <h2>{activeStudents}</h2>
        </div>

        <div className="stat-card">
          <span className="stat-icon">⏸️</span>
          <p>Inactive Students</p>
          <h2>{inactiveStudents}</h2>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-heading">
          <div>
            <h2>Recent Students</h2>
            <p>Recently added students</p>
          </div>

          <button type="button" onClick={onViewStudents}>
            View All
          </button>
        </div>

        {recentStudents.length === 0 ? (
          <div className="empty-state">
            <span>🎓</span>
            <h3>No students yet</h3>
            <p>Add your first student to get started.</p>
            <button type="button" onClick={onAddStudent}>
              Add Student
            </button>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="student-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Roll Number</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {recentStudents.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.rollNumber}</td>
                    <td>{student.email}</td>
                    <td>{student.department}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          student.status === "Active"
                            ? "status-active"
                            : "status-inactive"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
