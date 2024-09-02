// src/pages/AdminDepartmentsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AdminDepartmentsPage = () => {
  const { user } = useAuth();
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [newDepartment, setNewDepartment] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDepartments();
    fetchDoctors();
  }, []);

  const fetchDepartments = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:3000/api/departments', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setDepartments(response.data.departments);
    } catch (err) {
      console.error('Failed to fetch departments:', err);
      setError('Failed to fetch departments');
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctors = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:3000/api/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const filteredDoctors = response.data.users.filter(user => user.role === 'Doctor');
      setDoctors(filteredDoctors);
    } catch (err) {
      console.error('Failed to fetch doctors:', err);
      setError('Failed to fetch doctors');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDepartment = async () => {
    setError('');
    try {
      await axios.post(
        'http://localhost:3000/api/departments',
        { name: newDepartment },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setNewDepartment('');
      fetchDepartments(); // Refresh department list
    } catch (err) {
      console.error('Failed to create department:', err);
      setError('Failed to create department');
    }
  };

  const handleAddDoctorToDepartment = async () => {
    setError('');
    try {
      await axios.put(
        `http://localhost:3000/api/departments/${selectedDepartment}/add-doctor`,
        { doctorId: selectedDoctor },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setSelectedDepartment('');
      setSelectedDoctor('');
      fetchDepartments(); // Refresh department list
    } catch (err) {
      console.error('Failed to add doctor to department:', err);
      setError('Failed to add doctor to department');
    }
  };

  return (
    <div>
      <h1>Manage Departments</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div>
            <h2>Create a New Department</h2>
            <input
              type="text"
              placeholder="Department Name"
              value={newDepartment}
              onChange={(e) => setNewDepartment(e.target.value)}
            />
            <button onClick={handleCreateDepartment}>Create Department</button>
          </div>

          <div>
            <h2>Add Doctor to Department</h2>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">Select Department</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>

            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
            >
              <option value="">Select Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.username}
                </option>
              ))}
            </select>

            <button onClick={handleAddDoctorToDepartment}>
              Add Doctor to Department
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDepartmentsPage;
