const express = require('express');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const roleRoutes = require('./routes/roles'); 

const app = express();
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/roles', roleRoutes); 

module.exports = app;