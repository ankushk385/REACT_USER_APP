import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { UsersProvider } from './contexts/UsersContext';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UsersProvider>
          <App />
        </UsersProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
