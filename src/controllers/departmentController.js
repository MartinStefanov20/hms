const Department = require('../models/department');
const User = require('../models/user');

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
// Get all departments with associated doctors
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'role'],
          where: { role: 'Doctor' },
          required: false // Include departments even if they have no doctors
        }
      ]
    });
    res.status(200).json({ departments });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching departments', error });
  }
};

// Add a doctor to a department
// Add a doctor to a department
exports.addDoctorToDepartment = async (req, res) => {
  const { doctorId } = req.body;
  const { departmentId } = req.params;

  try {
    const department = await Department.findByPk(departmentId);
    const doctor = await User.findByPk(doctorId);

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    if (!doctor || doctor.role !== 'Doctor') {
      return res.status(404).json({ message: 'Doctor not found or user is not a doctor' });
    }

    // Assign the doctor to the department
    doctor.departmentId = departmentId;
    await doctor.save();

    res.status(200).json({ message: 'Doctor added to department successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding doctor to department', error });
  }
};

