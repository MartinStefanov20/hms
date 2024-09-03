const cron = require('node-cron');
const Appointment = require('../models/appointment');
const User = require('../models/user');
const {Op} = require("sequelize");
const {sendReminderEmail} = require("../config/mail");

// Run the job every day at 7am
cron.schedule('0 7 * * *', async () => {
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
        {model: User, as: 'patient', attributes: ['email']},
        {model: User, as: 'doctor', attributes: ['email']}
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
  } catch (error) {
    console.error('Error sending reminders:', error);
  }
});
