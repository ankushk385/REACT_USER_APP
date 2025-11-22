import React, { useMemo, useState } from "react";
import { useUsers } from "../contexts/UsersContext";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const { users, loading } = useUsers();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);
  const nav = useNavigate();
  const perPage = 4;
  console.log("This is Users", users);
  const filtered = useMemo(() => {
    let data = users.slice();
    if (q) {
      const s = q.toLowerCase();
      data = data.filter(
        (u) =>
          u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s)
      );
    }
    if (filter !== "All") {
      data = data.filter((u) => u.status === filter);
    }
    data.sort((a, b) => a.name.localeCompare(b.name) * (sortAsc ? 1 : -1));
    return data;
  }, [users, q, filter, sortAsc]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageData = filtered.slice((page - 1) * perPage, page * perPage);

  function gotoUser(id) {
    nav("/users/" + id);
  }

  return (
    <div>
      <div className="card">
        <h3>Users</h3>
        <div className="form-row" style={{ marginTop: 8 }}>
          <input
            placeholder="Search by name or email"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
          />
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(1);
            }}
          >
            <option>All</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <button className="btn" onClick={() => setSortAsc((s) => !s)}>
            {sortAsc ? "Sort A→Z" : "Sort Z→A"}
          </button>
        </div>
      </div>

      <div className="card">
        {loading && <div className="small">Loading users...</div>}
        {!loading && users.length === 0 && (
          <div className="small">No users</div>
        )}
        {!loading && users.length > 0 && (
          <>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Company</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {pageData.map((u) => (
                  <tr
                    key={u.id}
                    onClick={() => gotoUser(u.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.phone}</td>
                    <td>{u.company}</td>
                    <td>{u.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 12,
              }}
            >
              <div className="small">
                Page {page} / {totalPages}
              </div>
              <div>
                <button
                  className="btn"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Prev
                </button>
                <button
                  className="btn"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  style={{ marginLeft: 8 }}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
