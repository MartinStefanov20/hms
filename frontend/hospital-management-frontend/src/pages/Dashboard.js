import React, { useState, useEffect } from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import AdminDashboard from "../components/AdminDashboard";
import DoctorDashboard from "../components/DoctorDashboard";
import UserDashboard from "../components/UserDashboard";
import {useAuth} from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout }  = useAuth()
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log('MSF: ', user)
  })

  return (
    <div>
      <h2>Welcome, {user.username}!</h2>
      <p>Role: {user.role}</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <h3>Your Dashboard</h3>
        {
          user.role === 'Admin' ? <AdminDashboard /> :
          user.role === 'Doctor' ? <DoctorDashboard /> :
          user.role === 'User' ? <UserDashboard /> :
          <Navigate to="/" />
        }
      </div>
      <button onClick={() => {
        navigate('/');
      }}>
        Home
      </button>
      <button onClick={() => {
        logout()
        navigate('/');
      }}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
