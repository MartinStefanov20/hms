const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const authenticateToken = async (req, res, next) => {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return res.sendStatus(403);

    const userDetails = await User.findByPk(user.userId);
    req.user = { userId: user.userId, role: userDetails.role };

    next();
  });
};

module.exports = authenticateToken;
