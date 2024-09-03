const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {manuallySendReminders} = require("../helpers/sendReminders");
const Appointment = require("../models/appointment");
const {Op} = require("sequelize");
const {sendReminderEmail} = require("../config/mail");
require('dotenv').config();

// Register a new user
exports.register = async (req, res) => {
  const { username, password, email, role } = req.body;


  if (!username || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword, email, role });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// Login user
exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = await User.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

exports.me = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId, {
      attributes: ['id', 'username', 'role', 'createdAt']
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

exports.getAllUsers = async (req, res) => {
  const currentUserRole = req.user.role;

  try {
    const users = await User.findAll();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

exports.sendReminders = async (req, res) => {
  try {
    // Get the current date and add 24 hours
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);

    // Fetch appointments for the next day
    const upcomingAppointments = await Appointment.findAll({
      where: {
        date: {
          [Op.between]: [now, tomorrow]
        }
      },
      include: [
        { model: User, as: 'patient', attributes: ['email'] },  // Corrected 'as' alias
        { model: User, as: 'doctor', attributes: ['email'] }   // Corrected 'as' alias
      ]
    });

    // Send reminders
    upcomingAppointments.forEach(appointment => {
      const patientEmail = appointment.patient.email;
      const doctorEmail = appointment.doctor.email;
      const appointmentDate = new Date(appointment.date).toLocaleString();

      // Send reminder to patient
      sendReminderEmail(
        patientEmail,
        'Appointment Reminder',
        `You have an appointment scheduled on ${appointmentDate}.`
      );

      // Send reminder to doctor
      sendReminderEmail(
        doctorEmail,
        'Appointment Reminder',
        `You have an appointment with a patient on ${appointmentDate}.`
      );
    });

    console.log('Reminders sent successfully.');
    res.status(200).json({ message: 'Reminders sent successfully.' });
  } catch (error) {
    console.error('Error sending reminders:', error);
    res.status(500).json({ message: 'Error while sending reminders', error });
  }
}
