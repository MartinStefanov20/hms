// src/App.js
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {AuthProvider} from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from "./util/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import AppointmentsPage from "./pages/AppointmentsPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={Dashboard} />}
          />
          <Route
            path="/appointments"
            element={<ProtectedRoute element={AppointmentsPage} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
