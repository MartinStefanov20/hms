import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  return (
    <div>
      <h2>User Dashboard</h2>
      <div>
        <h3>Your Appointments</h3>
        <Link to="/appointments">View Appointments</Link>
      </div>
      <div>
        <h3>Request Appointment</h3>
        <Link to="/appointments/create">Request an Appointment</Link>
      </div>
    </div>
  );
};

export default UserDashboard;
