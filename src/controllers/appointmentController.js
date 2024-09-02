const Appointment = require('../models/appointment');
const User = require("../models/user");
const Prescription = require("../models/prescription");

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

// Archive an appointment
exports.archiveAppointment = async (req, res) => {
  const { appointmentId } = req.params;
  const userRole = req.user.role;

  if (userRole !== 'Doctor' && userRole !== 'Admin') {
    return res.status(403).json({ message: 'Access denied. Only doctors and admins can archive appointments.' });
  }

  try {
    const appointment = await Appointment.findByPk(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.status = 'ARCHIVED';
    await appointment.save();

    res.status(200).json({ message: 'Appointment archived successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Error archiving appointment', error });
  }
};


// Request an appointment
exports.requestAppointment = async (req, res) => {
  const { appointmentId } = req.params;
  const userRole = req.user.role;

  if (userRole !== 'Doctor' && userRole !== 'Admin') {
    return res.status(403).json({ message: 'Access denied. Only doctors and admins can archive appointments.' });
  }

  try {
    const appointment = await Appointment.findByPk(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.status = 'REQUESTED';
    await appointment.save();

    res.status(200).json({ message: 'Appointment archived successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Error archiving appointment', error });
  }
};


// Get all appointments for a user
exports.getUserAppointments = async (req, res) => {
  const { userId, username } = req.query;
  const { role, userId: currentUserId } = req.user;

  try {
    let whereClause = {};

    if (role === 'User') {
      whereClause.userId = currentUserId;
    } else if (role === 'Doctor' || role === 'Admin') {
      if (userId) {
        whereClause.userId = userId;
      } else if (username) {
        const user = await User.findOne({ where: { username } });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        whereClause.userId = user.id;
      }
    } else {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    const appointments = await Appointment.findAll({
      where: whereClause,
      include: [{
        model: Prescription,
        attributes: ['id', 'medication', 'dosage', 'instructions']
      }]
    });

    res.status(200).json({ appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all appointments for a doctor or all appointments for an admin
exports.getAppointmentsForDoctorId = async (req, res) => {
  const { role, userId: currentUserId } = req.user; // Destructure role and user ID from the authenticated user

  try {
    let whereClause = {};

    if (role === 'Doctor') {
      whereClause.doctorId = currentUserId;
    } else if (role === 'Admin') {
    } else {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    const appointments = await Appointment.findAll({ where: whereClause });

    res.status(200).json({ appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Request rescheduling of an appointment
exports.requestReschedule = async (req, res) => {
  const { appointmentId } = req.params;
  const { newDate } = req.body;
  const userId = req.user.userId;

  if (!newDate) {
    return res.status(400).json({ message: 'New date is required' });
  }

  try {
    const appointment = await Appointment.findByPk(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (appointment.userId !== userId) {
      return res.status(403).json({ message: 'You are not authorized to request rescheduling for this appointment' });
    }

    appointment.status = 'REQUESTED';
    appointment.date = newDate;
    await appointment.save();

    res.status(200).json({ message: 'Reschedule request submitted successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Error requesting reschedule', error });
  }
};
