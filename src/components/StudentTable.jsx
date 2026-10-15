
export default function StudentTable({
  students,
  departmentFilter,
  setDepartmentFilter,
  yearFilter,
  setYearFilter,
  statusFilter,
  setStatusFilter,
  onAddStudent,
  onEditStudent,
  onDeleteStudent,
}) {
  return (
    <div className="students-page">
      <div className="page-heading">
        <div>
          <h2>All Students</h2>
          <p>Manage your student records easily.</p>
        </div>

        <button type="button" onClick={onAddStudent}>
          + Add Student
        </button>
      </div>

      <div className="filters">
        <select
          value={departmentFilter}
          onChange={(event) =>
            setDepartmentFilter(event.target.value)
          }
        >
          <option value="All">All Departments</option>
          <option value="Computer">Computer</option>
          <option value="IT">IT</option>
          <option value="Mechanical">Mechanical</option>
          <option value="Civil">Civil</option>
        </select>

        <select
          value={yearFilter}
          onChange={(event) => setYearFilter(event.target.value)}
        >
          <option value="All">All Years</option>
          <option value="1">First Year</option>
          <option value="2">Second Year</option>
          <option value="3">Third Year</option>
          <option value="4">Fourth Year</option>
        </select>

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="table-wrapper">
        <table className="student-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll Number</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Year</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={8} className="empty-message">
                  No students found.
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.rollNumber}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>{student.department}</td>
                  <td>{student.year}</td>
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
                  <td>
                    <div className="table-actions">
                      <button
                        type="button"
                        onClick={() => onEditStudent(student)}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="delete-button"
                        onClick={() => onDeleteStudent(student)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="results-count">
        Showing {students.length} student(s)
      </p>
    </div>
  );
}
