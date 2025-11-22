import React, { useState } from "react";
import { useUsers } from "../contexts/UsersContext";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
  const { addUser } = useUsers();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("Active");
  const [msg, setMsg] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!name || !email) {
      setMsg("Name and email required");
      return;
    }
    addUser({
      name,
      email,
      phone,
      status,
      company,
      website: "",
      address: "",
    });
    setMsg("Created");
    setTimeout(() => {
      nav("/users");
    }, 700);
  }

  return (
    <div className="card" style={{ maxWidth: 600 }}>
      <h3>Create User</h3>
      <form onSubmit={submit}>
        <div style={{ marginBottom: 8 }}>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <input
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
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
