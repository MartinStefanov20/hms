import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const UserPrescriptionsPage = () => {
  const { user } = useAuth();
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserPrescriptions();
  }, []);

  const fetchUserPrescriptions = async () => {
    setLoading(true);
    setError('');
    try {
      // Fetch appointments for the user
      const appointmentsResponse = await axios.get('http://localhost:3000/api/appointments', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        params: {
          userId: user.id
        }
      });

      const appointmentIds = appointmentsResponse.data.appointments.map(a => a.id);

      // Fetch prescriptions for all appointments
      const prescriptionsResponse = await Promise.all(
        appointmentIds.map(id =>
          axios.get(`http://localhost:3000/api/prescriptions/appointment/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
        )
      );

      // Combine all prescriptions into a single list
      const allPrescriptions = prescriptionsResponse.flatMap(response => response.data.prescriptions);
      setPrescriptions(allPrescriptions);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch prescriptions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Your Prescriptions</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Medication</th>
            <th>Dosage</th>
            <th>Instructions</th>
            <th>Appointment ID</th>
          </tr>
          </thead>
          <tbody>
          {prescriptions.length > 0 ? (
            prescriptions.map(prescription => (
              <tr key={prescription.id}>
                <td>{prescription.id}</td>
                <td>{prescription.medication}</td>
                <td>{prescription.dosage}</td>
                <td>{prescription.instructions}</td>
                <td>{prescription.appointmentId}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No prescriptions found</td>
            </tr>
          )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserPrescriptionsPage;
