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
import CreateAppointmentPage from "./pages/CreateAppointmentPage";
import ManageAppointmentsPage from "./pages/ManageAppointmentsPage";
import PrescriptionPage from "./pages/PrescriptionPage";
import UserPrescriptionsPage from "./pages/UserPrescriptionPage";
import AdminUserManagementPage from "./pages/AdminUserManagmentPage";

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
          <Route path="/appointments/create" element={<CreateAppointmentPage />} />
          <Route path="/appointments/manage" element={<ProtectedRoute element={ManageAppointmentsPage} roles={['Doctor', 'Admin']} />} />
          <Route path="/prescription/:appointmentId" element={<ProtectedRoute element={PrescriptionPage} roles={['Doctor', 'Admin']} />} />
          <Route path="/prescriptions" element={<ProtectedRoute element={UserPrescriptionsPage} />} />
          <Route path="/admin/users" element={<ProtectedRoute element={AdminUserManagementPage} roles={['Admin']}/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
