import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AdminReminders.css';

const AdminReminders = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendReminders = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.get('http://localhost:3000/api/users/send-reminders', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMessage('Reminders sent successfully!');
    } catch (error) {
      setMessage('Error sending reminders: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reminder-container">
      <h1 className="reminder-title">Admin - Send Reminders</h1>
      <button
        className="reminder-button"
        onClick={handleSendReminders}
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send Reminders'}
      </button>
      {message && <p className="reminder-message">{message}</p>}
    </div>
  );
};

export default AdminReminders;
