const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Appointment = require('./appointment');

const Prescription = sequelize.define('Prescription', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  medication: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dosage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  instructions: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  appointmentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Appointment,
      key: 'id',
    },
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
});

// Associations
Appointment.hasOne(Prescription, { foreignKey: 'appointmentId' });
Prescription.belongsTo(Appointment, { foreignKey: 'appointmentId' });
User.hasMany(Prescription, { foreignKey: 'doctorId' });
Prescription.belongsTo(User, { foreignKey: 'doctorId' });

module.exports = Prescription;
