import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useAuth} from '../context/AuthContext';
import {useNavigate} from 'react-router-dom';
import '../styles/ManageAppointments.css'; // Import the CSS file

const ManageAppointmentsPage = () => {
  const {user} = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:3000/api/appointments/appointments-for-doctor`, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
      });
      const sortedAppointments = sortAppointments(response.data.appointments);
      setAppointments(sortedAppointments);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  const sortAppointments = (appointments) => {
    const statusOrder = {
      REQUESTED: 1,
      CONFIRMED: 2,
      ARCHIVED: 3,
      DENIED: 4,
    };

    return appointments.sort((a, b) => {
      const statusComparison = statusOrder[a.status] - statusOrder[b.status];
      if (statusComparison !== 0) {
        return statusComparison;
      }
      return new Date(a.date) - new Date(b.date);
    });
  };

  const handleChangeStatus = async (appointmentId, newStatus) => {
    setError('');
    try {
      let action;
      if (newStatus === 'CONFIRMED') action = 'approve';
      else if (newStatus === 'DENIED') action = 'decline';
      else if (newStatus === 'ARCHIVED') action = 'archive';
      else if (newStatus === 'REQUESTED') action = 'request';

      await axios.put(
        `http://localhost:3000/api/appointments/${action}/${appointmentId}`,
        {},
        {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}
      );
      fetchAppointments();
    } catch (err) {
      console.error(err);
      setError('Failed to update status');
    }
  };

  return (
    <div className="manage-appointments-container">
      <h1>Manage Appointments</h1>
      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="appointments-table">
          <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Status</th>
            <th>User ID</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.id}</td>
              <td>{new Date(appointment.date).toLocaleString()}</td>
              <td>{appointment.status}</td>
              <td>{appointment.userId}</td>
              <td>
                <select
                  value={appointment.status}
                  onChange={(e) => handleChangeStatus(appointment.id, e.target.value)}
                  className="status-select"
                >
                  <option value="REQUESTED">REQUESTED</option>
                  <option value="CONFIRMED">CONFIRMED</option>
                  <option value="DENIED">DENIED</option>
                  <option value="ARCHIVED">ARCHIVED</option>
                </select>
              </td>
              {appointment.status === 'ARCHIVED' && (
                <td>
                  <button
                    onClick={() => navigate(`/prescription/${appointment.id}`)}
                    className="write-prescription-button"
                  >
                    Write Prescription
                  </button>
                </td>
              )}
            </tr>
          ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageAppointmentsPage;
