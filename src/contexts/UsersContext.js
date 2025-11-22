import React, { createContext, useContext, useEffect, useState } from "react";

const UsersContext = createContext();

function randomStatus() {
  return Math.random() > 0.5 ? "Active" : "Inactive";
}

export function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load users (localStorage OR API)
  useEffect(() => {
    const raw = localStorage.getItem("uma_users_v1");

    // If stored data exists AND non-empty → use it
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.length > 0) {
        setUsers(parsed);
        return;
      }
    }

    // Otherwise fetch from API
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((r) => r.json())
      .then((data) => {
        const mapped = data.map((u) => ({
          id: u.id.toString(),
          name: u.name,
          email: u.email,
          phone: u.phone,
          company: u.company?.name || "",
          website: u.website,
          address: u.address
            ? `${u.address.suite}, ${u.address.street}, ${u.address.city}`
            : "",
          status: randomStatus(),
        }));

        setUsers(mapped);
        localStorage.setItem("uma_users_v1", JSON.stringify(mapped));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Persist changes
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem("uma_users_v1", JSON.stringify(users));
    }
  }, [users]);

  // Add new user
  function addUser(u) {
    setUsers((prev) => [{ ...u, id: Date.now().toString() }, ...prev]);
  }

  // Update user status/details
  function updateUser(id, patch) {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...patch } : u)));
  }

  // Get user by ID
  function getUser(id) {
    return users.find((u) => u.id === id);
  }

  // Compute stats
  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "Active").length,
    inactive: users.filter((u) => u.status === "Inactive").length,
  };

  return (
    <UsersContext.Provider
      value={{ users, loading, addUser, updateUser, getUser, stats }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export const useUsers = () => useContext(UsersContext);
