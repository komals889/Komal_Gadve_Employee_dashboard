import { useEffect, useState } from "react";

const statesList = [
  "Maharashtra",
  "Karnataka",
  "Gujarat",
  "Delhi",
  "Tamil Nadu",
];

const initialForm = {
  id: null,
  name: "",
  gender: "",
  dob: "",
  state: "",
  active: true,
  image: "",
};

const EmployeeForm = ({ onClose, onSave, editData }) => {
  const [form, setForm] = useState(initialForm);
  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState({});

  // Prefill data for Edit
  useEffect(() => {
    if (editData) {
      setForm(editData);
      setPreview(editData.image);
    }
  }, [editData]);

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.gender) newErrors.gender = "Gender is required";
    if (!form.dob) newErrors.dob = "DOB is required";
    if (!form.state) newErrors.state = "State is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setForm({ ...form, image: imageUrl });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      ...form,
      id: form.id ?? Date.now(),
    });
  };

  return (
    <div style={styles.overlay}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h3>{editData ? "Edit Employee" : "Add Employee"}</h3>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <span style={styles.error}>{errors.name}</span>}

        {/* Gender */}
        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {errors.gender && <span style={styles.error}>{errors.gender}</span>}

        {/* DOB */}
        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
        />
        {errors.dob && <span style={styles.error}>{errors.dob}</span>}

        {/* State */}
        <select name="state" value={form.state} onChange={handleChange}>
          <option value="">Select State</option>
          {statesList.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        {errors.state && <span style={styles.error}>{errors.state}</span>}

        {/* Image */}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && (
          <img src={preview} alt="Preview" style={styles.preview} />
        )}

        {/* Active */}
        <label style={styles.checkbox}>
          <input
            type="checkbox"
            name="active"
            checked={form.active}
            onChange={handleChange}
          />
          Active
        </label>

        {/* Buttons */}
        <div style={styles.actions}>
          <button type="submit">
            {editData ? "Update" : "Save"}
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },

  form: {
    backgroundColor: "#ffffff",
    width: "380px",
    padding: "24px",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    boxShadow: "0 20px 30px rgba(0,0,0,0.2)",
    animation: "fadeIn 0.2s ease-in-out",
  },

  preview: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    objectFit: "cover",
    marginTop: "8px",
    border: "2px solid #e5e7eb",
  },

  checkbox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    marginTop: "4px",
  },

  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "12px",
  },

  error: {
    color: "#dc2626",
    fontSize: "12px",
    marginTop: "-4px",
  },
};


export default EmployeeForm;
