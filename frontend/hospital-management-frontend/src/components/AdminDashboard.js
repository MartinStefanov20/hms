import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <h3>Your Appointments</h3>
        <Link to="/appointments">View Appointments</Link>
      </div>
      <div>
        <h3>Manage Appointments</h3>
        <Link to="/appointments/manage">View Appointments</Link>
      </div>
      <div>
        <h3>Manage Users</h3>
        <Link to="/admin/users">Manage Users</Link>
      </div>
      <div>
        <h3>Manage Departments</h3>
        <Link to="/departments">View Departments</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
