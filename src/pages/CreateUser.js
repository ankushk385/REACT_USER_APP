import React, { useState } from "react";
import { useUsers } from "../contexts/UsersContext";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
  const { addUser } = useUsers();
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "Active",
  });

  const [msg, setMsg] = useState("");

  function handleInput(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function submit(e) {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      setMsg("Name and email required");
      return;
    }

    addUser({
      ...formData,
      website: "",
      address: "",
    });

    setMsg("Created");
    setTimeout(() => nav("/users"), 700);
  }

  return (
    <div className="card" style={{ maxWidth: 600 }}>
      <h3>Create User</h3>
      <form onSubmit={submit}>
        <div style={{ marginBottom: 8 }}>
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInput}
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInput}
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleInput}
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <input
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleInput}
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <select name="status" value={formData.status} onChange={handleInput}>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        {msg && (
          <div className="small" style={{ color: "green", marginBottom: 8 }}>
            {msg}
          </div>
        )}

        <button className="btn" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
