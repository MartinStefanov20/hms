import React from 'react';
import { Link } from 'react-router-dom';

const DoctorDashboard = () => {
  return (
    <div>
      <h2>Doctor Dashboard</h2>
      <div>
        <h3>Your Appointments</h3>
        <Link to="/appointments">View Appointments</Link>
      </div>
      <div>
        <h3>Write Prescriptions</h3>
        <Link to="/prescriptions">Write Prescriptions</Link>
      </div>
    </div>
  );
};

export default DoctorDashboard;
