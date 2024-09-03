const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('REQUESTED', 'CONFIRMED', 'DENIED', 'ARCHIVED'),
    defaultValue: 'REQUESTED',
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
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
User.hasMany(Appointment, { foreignKey: 'userId', as: 'AppointmentsAsPatient' });
Appointment.belongsTo(User, { as: 'patient', foreignKey: 'userId' });

User.hasMany(Appointment, { foreignKey: 'doctorId', as: 'AppointmentsAsDoctor' });
Appointment.belongsTo(User, { as: 'doctor', foreignKey: 'doctorId' });

module.exports = Appointment;
