const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController');
const authenticateToken = require('../middleware/authMiddleware');
const roleMiddleware = require("../middleware/roleMiddleware");

// Create a prescription
router.post('/', authenticateToken, roleMiddleware(['Doctor', 'Admin']), prescriptionController.createPrescription);

// Get prescriptions for an appointment
router.get('/appointment/:appointmentId', authenticateToken, prescriptionController.getPrescriptionsForAppointment);

module.exports = router;
