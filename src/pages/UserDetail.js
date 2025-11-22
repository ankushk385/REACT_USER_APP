import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUsers } from '../contexts/UsersContext';

export default function UserDetail(){
  const { id } = useParams();
  const { getUser, updateUser } = useUsers();
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(()=>{
    const u = getUser(id);
    setUser(u);
    if(u) setStatus(u.status);
  },[id, getUser]);

  function save(){
    updateUser(id, { status });
    alert('Saved');
  }

  if(!user) return <div className="card">User not found</div>;

  return (
    <div>
      <div className="card">
        <h3>{user.name}</h3>
        <div className="small">Email: {user.email}</div>
        <div className="small">Phone: {user.phone}</div>
        <div className="small">Website: {user.website}</div>
      </div>

      <div className="card">
        <h4>Company</h4>
        <div className="small">{user.company}</div>
      </div>

      <div className="card">
        <h4>Address</h4>
        <div className="small">{user.address}</div>
      </div>

      <div className="card">
        <h4>Status</h4>
        <select value={status} onChange={e=>setStatus(e.target.value)}>
          <option>Active</option>
          <option>Inactive</option>
        </select>
        <div style={{marginTop:8}}>
          <button className="btn" onClick={save}>Save</button>
        </div>
      </div>
    </div>
  );
}
