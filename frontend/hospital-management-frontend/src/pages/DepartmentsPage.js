import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
      <h1>Departments</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {departments.map((department) => (
            <div key={department.id} style={{ marginBottom: '20px' }}>
              <h2>{department.name}</h2>
              <h3>Doctors:</h3>
              {department.Users && department.Users.length > 0 ? (
                <ul>
                  {department.Users.map((doctor) => (
                    <li key={doctor.id}>{doctor.username}</li>
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
