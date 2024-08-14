const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const authenticateToken = require('../middleware/authMiddleware');
const roleMiddleware = require("../middleware/roleMiddleware");

// Create a department
router.post('/', authenticateToken, roleMiddleware(['Admin']), departmentController.createDepartment);

// Get all departments
router.get('/', authenticateToken, departmentController.getDepartments);

module.exports = router;
