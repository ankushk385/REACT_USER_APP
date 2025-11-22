import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      nav("/dashboard");
    }
  }, [isAuthenticated, nav]);

  async function submit(e) {
    e.preventDefault();
    setErr("");

    if (!email || !password) {
      setErr("Email and password required");
      return;
    }

    const res = login(email.trim(), password);

    if (res.ok) {
      nav("/dashboard");
    } else {
      setErr(res.error || "Login failed");
    }
  }

  return (
    <div className="card" style={{ maxWidth: 420, margin: "20px auto" }}>
      <h3>Login</h3>
      <form onSubmit={submit}>
        <div style={{ marginBottom: 8 }}>
          <input
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {err && (
          <div className="small" style={{ color: "red", marginBottom: 8 }}>
            {err}
          </div>
        )}

        <button className="btn" type="submit">
          Login
        </button>

        <div className="small" style={{ marginTop: 8 }}>
          Use <strong>admin@example.com</strong> / <strong>admin123</strong>
        </div>
      </form>
    </div>
  );
}
