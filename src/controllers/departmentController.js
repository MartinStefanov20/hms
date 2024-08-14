const Department = require('../models/department');

// Create a department
exports.createDepartment = async (req, res) => {
  const { name } = req.body;
  const userRole = req.user.role

  if (userRole !== 'Admin') {
    return res.status(403).json({ message: 'Access denied. Only admins can create departments.' });
  }

  if (!name) {
    return res.status(400).json({ message: 'Department name is required' });
  }

  try {
    const department = await Department.create({ name });
    res.status(201).json({ message: 'Department created successfully', department });
  } catch (error) {
    res.status(500).json({ message: 'Error creating department', error });
  }
};

// Get all departments
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll();
    res.status(200).json({ departments });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching departments', error });
  }
};
