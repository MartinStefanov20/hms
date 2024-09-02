import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/Appointments.css'; // Import the CSS file

const AppointmentsPage = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [searchUser, setSearchUser] = useState('');
  const [searchId, setSearchId] = useState('');
  const [rescheduleAppointment, setRescheduleAppointment] = useState({ id: null, newDate: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (user.role === 'User') {
          const response = await axios.get(`http://localhost:3000/api/appointments?userId=${user.id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });

          setAppointments(response.data.appointments);
        }
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      }
    };

    fetchAppointments();
  }, [user]);

  const handleSearch = async () => {
    try {
      let query = '';

      if (searchUser) {
        query = `username=${searchUser}`;
      } else if (searchId) {
        query = `userId=${searchId}`;
      }

      const response = await axios.get(`http://localhost:3000/api/appointments?${query}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      setAppointments(response.data.appointments);
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    }
  };

  const handleReschedule = async (appointmentId) => {
    setError('');
    try {
      await axios.put(
        `http://localhost:3000/api/appointments/request-reschedule/${appointmentId}`,
        { newDate: rescheduleAppointment.newDate },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setRescheduleAppointment({ id: null, newDate: '' });
      const updatedAppointments = appointments.map(appointment =>
        appointment.id === appointmentId ? { ...appointment, status: 'RESCHEDULED' } : appointment
      );
      setAppointments(updatedAppointments);
    } catch (err) {
      console.error('Failed to request reschedule:', err);
      setError('Failed to request reschedule');
    }
  };

  return (
    <div className="appointments-container">
      <h2>Appointments</h2>
      {user.role !== 'User' && (
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by username"
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            className="search-input"
          />
          <input
            type="text"
            placeholder="Search by user ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">Search</button>
        </div>
      )}
      <div className="appointments-list">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="appointment-card">
            <h3>Appointment ID: {appointment.id}</h3>
            <p>Date: {new Date(appointment.date).toLocaleString()}</p>
            <p>Status: {appointment.status}</p>
            {appointment.status === 'REQUESTED' && (
              <div className="reschedule-container">
                <input
                  type="datetime-local"
                  value={rescheduleAppointment.id === appointment.id && rescheduleAppointment.newDate
                    ? rescheduleAppointment.newDate
                    : new Date(appointment.date).toISOString().slice(0, 16)
                  }
                  onChange={(e) => setRescheduleAppointment({ id: appointment.id, newDate: e.target.value })}
                  className="datetime-input"
                />
                <button onClick={() => handleReschedule(appointment.id)} className="reschedule-button">Request Reschedule</button>
              </div>
            )}
          </div>
        ))}
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default AppointmentsPage;
