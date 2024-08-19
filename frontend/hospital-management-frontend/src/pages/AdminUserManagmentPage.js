// AdminUserManagementPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AdminUserManagementPage = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedRoles, setSelectedRoles] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:3000/api/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const sortedUsers = response.data.users.sort((a, b) => a.id - b.id); // Sort users by ID
      setUsers(sortedUsers);

      // Initialize selectedRoles state with current roles
      const roles = response.data.users.reduce((acc, user) => {
        acc[user.id] = user.role;
        return acc;
      }, {});
      setSelectedRoles(roles);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId) => {
    setError('');
    try {
      await axios.put(
        'http://localhost:3000/api/roles/change-role',
        {
          userId: userId,
          newRole: selectedRoles[userId],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      fetchUsers(); // Refresh the user list after role update
    } catch (err) {
      console.error(err);
      setError('Failed to update user role');
    }
  };

  const handleRoleSelect = (userId, newRole) => {
    setSelectedRoles(prevRoles => ({
      ...prevRoles,
      [userId]: newRole
    }));
  };

  return (
    <div>
      <h1>Manage Users</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Current Role</th>
            <th>New Role</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <select
                  value={selectedRoles[user.id] || user.role}
                  onChange={(e) => handleRoleSelect(user.id, e.target.value)}
                >
                  <option value="">Select Role</option>
                  <option value="User">User</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Admin">Admin</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleRoleChange(user.id)}>Update Role</button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUserManagementPage;
