const roleMiddleware = (requiredRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (requiredRoles.includes(userRole)) {
      return next();
    } else {
      return res.status(403).json({ message: "Access denied: You don't have the required permissions" });
    }
  };
};

module.exports = roleMiddleware;