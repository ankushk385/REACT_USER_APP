import React from "react";
import { useUsers } from "../contexts/UsersContext";

export default function Dashboard() {
  const { stats, loading } = useUsers();

  if (loading) {
    return <div className="card">Loading dashboard...</div>;
  }

  return (
    <div>
      <div className="card">
        <h3>Dashboard</h3>
        <p className="small">Summary stats computed from users</p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 12,
        }}
      >
        <div className="card">
          <h4>Total Users</h4>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{stats.total}</div>
        </div>

        <div className="card">
          <h4>Active Users</h4>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{stats.active}</div>
        </div>

        <div className="card">
          <h4>Inactive Users</h4>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{stats.inactive}</div>
        </div>
      </div>
    </div>
  );
}
