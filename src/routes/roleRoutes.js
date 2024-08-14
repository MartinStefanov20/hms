const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const authenticateToken = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');


// Change user role route (protected route)
router.put('/change-role', authenticateToken, roleMiddleware(['Admin']), roleController.changeUserRole);

module.exports = router;
