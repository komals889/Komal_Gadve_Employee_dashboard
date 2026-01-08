const EmployeeTable = ({
  employees,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  if (!employees.length) {
    return <p style={{ textAlign: "center", color: "#6b7280" }}>
  No employees found. Please add employees.
</p>
;
  }

  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Profile</th>
          <th>Name</th>
          <th>Gender</th>
          <th>DOB</th>
          <th>State</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {employees.map((emp) => (
          <tr key={emp.id}>
            <td>{emp.id}</td>

            <td>
              <img
                src={emp.image}
                alt="profile"
                style={styles.avatar}
              />
            </td>

            <td>{emp.name}</td>
            <td>{emp.gender}</td>
            <td>{emp.dob}</td>
            <td>{emp.state}</td>

            <td>
              <input
                type="checkbox"
                checked={emp.active}
                onChange={() => onToggleStatus(emp.id)}
              />
            </td>

            <td style={styles.actions}>
              <button style={{ background: "#2563eb", color: "#fff" }} onClick={() => onEdit(emp)}>Edit</button>
              <button style={{ background: "#ef4444", color: "#fff" }}onClick={() => onDelete(emp.id)}>Delete</button>
              <button style={{ background: "#10b981", color: "#fff" }}onClick={() => window.print()}>Print</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const styles = {
  table: {
    width: "100%",
    background: "#fff",
    borderCollapse: "collapse",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  actions: {
    display: "flex",
    gap: "8px",
  },
};

export default EmployeeTable;
