// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();


  return (
    <button onClick={() => {
      navigate('/dashboard');
    }}>
      dashboard
    </button>
  );
};

export default LandingPage;
