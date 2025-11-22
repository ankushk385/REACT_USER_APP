import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import UserDetail from './pages/UserDetail';
import CreateUser from './pages/CreateUser';
import { useAuth } from './contexts/AuthContext';
import NavBar from './components/NavBar';

function App(){
  const { isAuthenticated } = useAuth();
  return (
    <div className="container">
      <NavBar />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to='/dashboard' /> : <Navigate to='/login' />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={ <RequireAuth><Dashboard/></RequireAuth> } />
        <Route path="/users" element={ <RequireAuth><Users/></RequireAuth> } />
        <Route path="/users/create" element={ <RequireAuth><CreateUser/></RequireAuth> } />
        <Route path="/users/:id" element={ <RequireAuth><UserDetail/></RequireAuth> } />
        <Route path="*" element={<div className="card">Page not found</div>} />
      </Routes>
    </div>
  );
}

function RequireAuth({ children }){
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  if(!isAuthenticated){
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default App;
