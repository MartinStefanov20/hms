import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/Dashboard.css'; // Import the CSS file

const DoctorDashboard = () => {
  return (
    <div className="dashboard-section">
      <h2>Doctor Dashboard</h2>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>View All Appointments</h3>
          <Link to="/appointments" className="dashboard-link">View Appointments</Link>
        </div>
        <div className="dashboard-card">
          <h3>Manage Appointments</h3>
          <Link to="/appointments/manage" className="dashboard-link">Manage Appointments</Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
