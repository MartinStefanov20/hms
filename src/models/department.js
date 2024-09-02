const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require("./user"); // Adjust the path as necessary

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

Department.hasMany(User, { foreignKey: 'departmentId' });
User.belongsTo(Department, { foreignKey: 'departmentId' });

module.exports = Department;
