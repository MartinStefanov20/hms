import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css'; // Import the CSS file

const UserDashboard = () => {
  return (
    <div className="dashboard-section">
      <h2>User Dashboard</h2>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Your Appointments</h3>
          <Link to="/appointments" className="dashboard-link">View Appointments</Link>
        </div>
        <div className="dashboard-card">
          <h3>Request Appointment</h3>
          <Link to="/appointments/create" className="dashboard-link">Request an Appointment</Link>
        </div>
        <div className="dashboard-card">
          <h3>Your Prescriptions</h3>
          <Link to="/prescriptions" className="dashboard-link">View Prescriptions</Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
