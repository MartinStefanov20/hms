const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('hospital_management', 'admin', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
