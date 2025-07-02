const express = require('express');
const app = express();
const doctorsRoutes = require('./js/doctors.routes');
const treatmentPlansRoutes = require('./treatment-plans.routes');
const medicationsRoutes = require('./medications.routes');

app.use('/api/doctors', doctorsRoutes);
app.use('/api/treatment-plans', treatmentPlansRoutes);
app.use('/api/medications', medicationsRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});