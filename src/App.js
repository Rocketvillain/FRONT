import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import React from 'react';
import LoginForm from './pages/LoginForm';

function App() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <LoginForm />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* {role === 'admin' && <Route path="/" element={<AdminMain />} />}
        {role === 'hosadmin' && <Route path="/" element={<HosAdminMain />} />}
        {role === 'user' && <Route path="/" element={<UserMain />} />}
        <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

