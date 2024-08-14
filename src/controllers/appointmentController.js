const Appointment = require('../models/appointment');

// Create an appointment
exports.createAppointment = async (req, res) => {
  const { date, doctorId } = req.body;
  const userId = req.user.userId;

  if (!date || !doctorId) {
    return res.status(400).json({ message: 'Date and doctor ID are required' });
  }

  try {
    const appointment = await Appointment.create({ date, status: 'REQUESTED', userId, doctorId });
    res.status(201).json({ message: 'Appointment created successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Error creating appointment', error });
  }
};

// Approve an appointment
exports.approveAppointment = async (req, res) => {
  const { appointmentId } = req.params;
  const userRole = req.user.role;

  if (userRole !== 'Doctor' && userRole !== 'Admin') {
    return res.status(403).json({ message: 'Access denied. Only doctors can approve appointments.' });
  }

  try {
    const appointment = await Appointment.findByPk(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.status = 'CONFIRMED';
    await appointment.save();

    res.status(200).json({ message: 'Appointment approved successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Error approving appointment', error });
  }
};

// Decline an appointment
exports.declineAppointment = async (req, res) => {
  const { appointmentId } = req.params;
  const userRole = req.user.role;

  if (userRole !== 'Doctor' && userRole !== 'Admin') {
    return res.status(403).json({ message: 'Access denied. Only doctors can decline appointments.' });
  }

  try {
    const appointment = await Appointment.findByPk(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.status = 'DENIED';
    await appointment.save();

    res.status(200).json({ message: 'Appointment declined successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Error declining appointment', error });
  }
};

// Get all appointments for a user
exports.getUserAppointments = async (req, res) => {
  const userId = req.body.userId;

  console.log(userId)

  try {
    const appointments = await Appointment.findAll({ where: { userId } });
    res.status(200).json({ appointments });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error });
  }
};
