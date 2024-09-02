import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/CreateAppointment.css'; // Import the CSS file

const CreateAppointmentPage = () => {
  const { user } = useAuth();
  const [date, setDate] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
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
    }
  };

  const handleCreateAppointment = async () => {
    setError('');
    setMessage('');
    try {
      await axios.post(
        'http://localhost:3000/api/appointments',
        { date, doctorId },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setMessage('Appointment created successfully');
      setDate('');
      setDoctorId('');
    } catch (err) {
      console.error(err);
      setError('Failed to create appointment');
    }
  };

  return (
    <div className="create-appointment-container">
      <h1>Create Appointment</h1>
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}
      <div className="form-group">
        <label htmlFor="date">Date and Time</label>
        <input
          type="datetime-local"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="doctorId">Select Doctor</label>
        <select
          id="doctorId"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          className="form-select"
          required
        >
          <option value="" disabled>Select a doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.username}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleCreateAppointment} className="submit-button">Create Appointment</button>
    </div>
  );
};

export default CreateAppointmentPage;
