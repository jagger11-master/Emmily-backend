const express = require('express');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const roleRoutes = require('./routes/roles'); 
const qaRoutes = require('./routes/qa');

const app = express();
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/qa', qaRoutes); 

module.exports = app;