import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/PrescriptionPage.css'; // Import the CSS file

const PrescriptionPage = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [medication, setMedication] = useState('');
  const [dosage, setDosage] = useState('');
  const [instructions, setInstructions] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/prescriptions', {
        medication,
        dosage,
        instructions,
        appointmentId
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      navigate('/appointments');
    } catch (err) {
      console.error(err);
      setError('Failed to submit prescription');
    }
  };

  return (
    <div className="prescription-container">
      <h1>Write Prescription</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="prescription-form">
        <div className="form-group">
          <label htmlFor="medication">Medication:</label>
          <input
            type="text"
            id="medication"
            value={medication}
            onChange={(e) => setMedication(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dosage">Dosage:</label>
          <input
            type="text"
            id="dosage"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="instructions">Instructions:</label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="form-textarea"
            required
          />
        </div>
        <button type="submit" className="submit-button">Submit Prescription</button>
      </form>
    </div>
  );
};

export default PrescriptionPage;
