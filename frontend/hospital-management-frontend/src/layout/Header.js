import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Header.css';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">MyHealth</h1>
        <nav>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/appointments">Appointments</Link></li>
            <li><Link to="/departments">Departments</Link></li>
            {user ? (
              <>
                <li><button onClick={logout} className="logout-button">Logout</button></li>
              </>
            ) : (
              <li><Link to="/login" className="login-button">Login</Link></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
