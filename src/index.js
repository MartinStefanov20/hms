const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const prescriptionRoutes = require('./routes/prescriptionRoutes');
const departmentRoutes = require('./routes/departmentRoutes');


require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes and origins
app.use(cors());

app.use(express.json());

// Use user routes
app.use('/api/users', userRoutes);
// Use role routes
app.use('/api/roles', roleRoutes);
// Use appointment routes
app.use('/api/appointments', appointmentRoutes);
// Use prescription routes
app.use('/api/prescriptions', prescriptionRoutes);
// Use department routes
app.use('/api/departments', departmentRoutes);

// Sync database
sequelize.sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch((err) => {
    console.error('Unable to sync database:', err);
  });

app.get('/', (req, res) => {
  res.send('Hospital Management System API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
