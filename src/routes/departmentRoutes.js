const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const authenticateToken = require('../middleware/authMiddleware');
const roleMiddleware = require("../middleware/roleMiddleware");

// Create a department
router.post('/', authenticateToken, roleMiddleware(['Admin']), departmentController.createDepartment);

// Get all departments
router.get('/', departmentController.getDepartments);

// Add a doctor to a department
router.put('/:departmentId/add-doctor', authenticateToken, roleMiddleware(['Admin']), departmentController.addDoctorToDepartment);


module.exports = router;
