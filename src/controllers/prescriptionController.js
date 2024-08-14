const Prescription = require('../models/prescription');
const Appointment = require('../models/appointment');

// Create a prescription
exports.createPrescription = async (req, res) => {
  const { medication, dosage, instructions, appointmentId } = req.body;
  const doctorId = req.user.userId;
  const userRole = req.user.role;

  if (userRole !== 'Doctor' && userRole !== 'Admin') {
    return res.status(403).json({ message: 'Access denied. Only doctors can create prescriptions.' });
  }

  if (!medication || !dosage || !appointmentId) {
    return res.status(400).json({ message: 'Medication, dosage, and appointment ID are required' });
  }

  try {
    const appointment = await Appointment.findByPk(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    const prescription = await Prescription.create({ medication, dosage, instructions, appointmentId, doctorId });
    res.status(201).json({ message: 'Prescription created successfully', prescription });
  } catch (error) {
    res.status(500).json({ message: 'Error creating prescription', error });
  }
};

// Get prescriptions for an appointment
exports.getPrescriptionsForAppointment = async (req, res) => {
  const { appointmentId } = req.params;

  try {
    const prescriptions = await Prescription.findAll({ where: { appointmentId } });
    res.status(200).json({ prescriptions });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching prescriptions', error });
  }
};
