const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const authenticateToken = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');


// Create an appointment
router.post('/', authenticateToken, appointmentController.createAppointment);

// Approve an appointment
router.put('/approve/:appointmentId', authenticateToken, roleMiddleware(['Doctor', 'Admin']), appointmentController.approveAppointment);

// Decline an appointment
router.put('/decline/:appointmentId', authenticateToken, roleMiddleware(['Doctor', 'Admin']), appointmentController.declineAppointment);

// Get user appointments
router.get('/', authenticateToken, appointmentController.getUserAppointments);

module.exports = router;
