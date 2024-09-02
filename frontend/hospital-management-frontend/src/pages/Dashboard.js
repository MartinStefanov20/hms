import React from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import AdminDashboard from "../components/AdminDashboard";
import DoctorDashboard from "../components/DoctorDashboard";
import UserDashboard from "../components/UserDashboard";
import {useAuth} from "../context/AuthContext";
import '../styles/Dashboard.css';

const Dashboard = () => {
  const {user, logout} = useAuth();
  const navigate = useNavigate();

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard">
        <div className="dashboard-welcome">Welcome, {user.username}!</div>
        <div className="dashboard-role">Role: {user.role}</div>
        <div className="dashboard-content">
          {
            user.role === 'Admin' ? <AdminDashboard/> :
              user.role === 'Doctor' ? <DoctorDashboard/> :
                user.role === 'User' ? <UserDashboard/> :
                  <Navigate to="/"/>
          }
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
