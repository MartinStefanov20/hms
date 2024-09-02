import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/DepartmentsPage.css'; // Import the CSS file

const DepartmentsPage = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get('http://localhost:3000/api/departments');
        setDepartments(response.data.departments);
      } catch (err) {
        console.error('Failed to fetch departments:', err);
        setError('Failed to fetch departments');
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div className="departments-container">
      <h1>Departments</h1>
      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <p className="loading-message">Loading...</p>
      ) : (
        <div className="departments-list">
          {departments.map((department) => (
            <div key={department.id} className="department-card">
              <h2>{department.name}</h2>
              <h3>Doctors:</h3>
              {department.Users && department.Users.length > 0 ? (
                <ul className="doctor-list">
                  {department.Users.map((doctor) => (
                    <li key={doctor.id} className="doctor-item">{doctor.username}</li>
                  ))}
                </ul>
              ) : (
                <p>No doctors assigned to this department.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DepartmentsPage;
