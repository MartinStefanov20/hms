const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as necessary

class Department extends Model {}

Department.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  modelName: 'Department',
  tableName: 'Departments',
  timestamps: true
});

module.exports = Department;
