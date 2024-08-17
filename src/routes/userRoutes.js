const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');


// Register route
router.post('/register', userController.register);

// Login route
router.post('/login', userController.login);

router.get('/me', authenticateToken,  userController.me);

module.exports = router;
