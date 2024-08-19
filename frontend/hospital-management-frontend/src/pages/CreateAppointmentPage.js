import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const CreateAppointmentPage = () => {
  const { user } = useAuth();
  const [date, setDate] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleCreateAppointment = async () => {
    setError('');
    setMessage('');
    try {
      const response = await axios.post(
        'http://localhost:3000/api/appointments',
        {
          date,
          doctorId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
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
    <div>
      <h1>Create Appointment</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <div>
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="number"
          placeholder="Doctor ID"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          required
        />
      </div>
      <button onClick={handleCreateAppointment}>Create Appointment</button>
    </div>
  );
};

export default CreateAppointmentPage;
