import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

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
    <div>
      <h2>Appointments</h2>
      {user.role !== 'User' && (
        <div>
          <input
            type="text"
            placeholder="Search by username"
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by user ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      )}
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            Appointment ID: {appointment.id} | Date: {new Date(appointment.date).toLocaleString()} |
            Status: {appointment.status}
            {appointment.status === 'REQUESTED' && (
              <>
                <input
                  type="datetime-local"
                  value={rescheduleAppointment.id === appointment.id && rescheduleAppointment.newDate
                    ? rescheduleAppointment.newDate
                    : new Date(appointment.date).toISOString().slice(0, 16)
                  }
                  onChange={(e) => setRescheduleAppointment({ id: appointment.id, newDate: e.target.value })}
                />
                <button onClick={() => handleReschedule(appointment.id)}>Request Reschedule</button>
              </>
            )}
          </li>
        ))}
      </ul>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AppointmentsPage;
