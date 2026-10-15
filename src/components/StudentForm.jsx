
export default function StudentForm({
  student,
  editing,
  onChange,
  onSubmit,
  onCancel,
}) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    onChange({ ...student, [name]: value });
  };

  return (
    <div className="form-container">
      <h2>{editing ? "Edit Student" : "Add New Student"}</h2>

      <form onSubmit={onSubmit} className="student-form">
        <label>Full Name</label>
        <input
          name="name"
          value={student.name || ""}
          onChange={handleChange}
          placeholder="Enter full name"
          required
        />

        <label>Roll Number</label>
        <input
          name="rollNumber"
          value={student.rollNumber || ""}
          onChange={handleChange}
          placeholder="Enter roll number"
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={student.email || ""}
          onChange={handleChange}
          placeholder="Enter email"
          required
        />

        <label>Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={student.phone || ""}
          onChange={handleChange}
          placeholder="10-digit phone number"
          maxLength={10}
          required
        />

        <label>Department</label>
        <select
          name="department"
          value={student.department || ""}
          onChange={handleChange}
          required
        >
          <option value="">Select Department</option>
          <option value="Computer">Computer</option>
          <option value="IT">IT</option>
          <option value="Mechanical">Mechanical</option>
          <option value="Civil">Civil</option>
        </select>

        <label>Year</label>
        <select
          name="year"
          value={student.year || ""}
          onChange={handleChange}
          required
        >
          <option value="">Select Year</option>
          <option value="1">First Year</option>
          <option value="2">Second Year</option>
          <option value="3">Third Year</option>
          <option value="4">Fourth Year</option>
        </select>

        <label>Status</label>
        <select
          name="status"
          value={student.status || "Active"}
          onChange={handleChange}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <div className="form-actions">
          <button type="submit">
            {editing ? "Update Student" : "Add Student"}
          </button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
