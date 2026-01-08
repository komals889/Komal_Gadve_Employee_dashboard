const SearchFilter = ({
  searchText,
  setSearchText,
  genderFilter,
  setGenderFilter,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Search by name"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={styles.input}
      />

      <select
        value={genderFilter}
        onChange={(e) => setGenderFilter(e.target.value)}
        style={styles.select}
      >
        <option value="">All Genders</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        style={styles.select}
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
  },
  input: {
    flex: 1,
    padding: "8px",
  },
  select: {
    padding: "8px",
  },
};

export default SearchFilter;
