import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function NavBar() {
  const { isAuthenticated, logout, user } = useAuth();
  const nav = useNavigate();
  function doLogout() {
    logout();
    nav("/login");
  }
  return (
    <div className="header">
      <div className="brand">UserApp</div>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {isAuthenticated ? (
          <>
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
            <Link className="nav-link" to="/users">
              Users
            </Link>
            <Link className="nav-link" to="/users/create">
              Create
            </Link>
            <div style={{ marginLeft: 8 }} className="small">
              {user?.email}
            </div>
            <button className="btn" onClick={doLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
}
