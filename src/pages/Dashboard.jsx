import { useEffect, useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";
import SearchFilter from "../components/SearchFilter";



const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");


  useEffect(() => {
    const storedEmployees =
      JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(storedEmployees);
  }, []);

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(emp => emp.active).length;
  const inactiveEmployees = totalEmployees - activeEmployees;

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/login";
  };
  const handleSaveEmployee = (employee) => {
    const updatedEmployees = editEmployee
      ? employees.map(emp => emp.id === employee.id ? employee : emp)
      : [...employees, employee];

    setEmployees(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    setShowForm(false);
    setEditEmployee(null);
  };
  const handleEdit = (employee) => {
    setEditEmployee(employee);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    const updated = employees.filter(emp => emp.id !== id);
    setEmployees(updated);
    localStorage.setItem("employees", JSON.stringify(updated));
  };

  const handleToggleStatus = (id) => {
    const updated = employees.map(emp =>
      emp.id === id ? { ...emp, active: !emp.active } : emp
    );
    setEmployees(updated);
    localStorage.setItem("employees", JSON.stringify(updated));
  };
  const filteredEmployees = employees
    .filter(emp =>
      emp.name.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter(emp =>
      genderFilter ? emp.gender === genderFilter : true
    )
    .filter(emp =>
      statusFilter
        ? statusFilter === "active"
          ? emp.active
          : !emp.active
        : true
    );

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2>Employee Management Dashboard</h2>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>

      {/* Summary Cards */}
      <div style={styles.cards}>
        <Card title="Total Employees" value={totalEmployees} />
        <Card title="Active Employees" value={activeEmployees} />
        <Card title="Inactive Employees" value={inactiveEmployees} />
      </div>

      {/* Actions */}
      <div style={styles.actions}>
        {/* <button style={styles.addBtn}>+ Add Employee</button> */}
        <button onClick={() => setShowForm(true)} style={styles.addBtn}>
          + Add Employee
        </button>

      </div>

      {/* Placeholder for Employee Table */}
      <SearchFilter
        searchText={searchText}
        setSearchText={setSearchText}
        genderFilter={genderFilter}
        setGenderFilter={setGenderFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <EmployeeTable
        employees={filteredEmployees}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
      />



      {showForm && (
        <EmployeeForm
          onClose={() => {
            setShowForm(false);
            setEditEmployee(null);
          }}
          onSave={handleSaveEmployee}
          editData={editEmployee}
        />
      )}

    </div>
  );
};

const Card = ({ title, value }) => (
  <div style={styles.card}>
    <h4>{title}</h4>
    <p style={styles.cardValue}>{value}</p>
  </div>
);

const styles = {
  container: {
    padding: "20px",
    background: "#f5f7fa",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  logoutBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  cards: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  },
  card: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    flex: 1,
    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
  },
  cardValue: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  actions: {
    marginBottom: "15px",
  },
  addBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  tablePlaceholder: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    color: "#6b7280",
  },
};

export default Dashboard;
