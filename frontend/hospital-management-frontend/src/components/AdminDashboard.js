import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/Dashboard.css';

const AdminDashboard = () => {
  return (
    <div className="dashboard-section">
      <h2>Admin Dashboard</h2>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>View All Appointments</h3>
          <Link to="/appointments" className="dashboard-link">View Appointments</Link>
        </div>
        <div className="dashboard-card">
          <h3>Manage Appointments</h3>
          <Link to="/appointments/manage" className="dashboard-link">Manage Appointments</Link>
        </div>
        <div className="dashboard-card">
          <h3>Manage Users</h3>
          <Link to="/admin/users" className="dashboard-link">Manage Users</Link>
        </div>
        <div className="dashboard-card">
          <h3>Manage Departments</h3>
          <Link to="/departments/manage" className="dashboard-link">View Departments</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
