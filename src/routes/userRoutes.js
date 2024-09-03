const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');
const roleMiddleware = require("../middleware/roleMiddleware");


// Register route
router.post('/register', userController.register);

// Login route
router.post('/login', userController.login);

router.get('/me', authenticateToken,  userController.me);

router.get('/', authenticateToken, userController.getAllUsers);

router.get('/send-reminders', authenticateToken, roleMiddleware(['Admin']), userController.sendReminders)


module.exports = router;
