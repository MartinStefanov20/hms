const User = require('../models/user');

// Change user role
exports.changeUserRole = async (req, res) => {
  const { userId, newRole } = req.body;

  if (!userId || !newRole) {
    return res.status(400).json({ message: 'User ID and new role are required' });
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = newRole;
    await user.save();
    res.status(200).json({ message: 'User role updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user role', error });
  }
};
