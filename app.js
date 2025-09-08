const express = require('express');
const authRoutes = require("./routes/auth");

const app = express();
//middleware
app.use(express.json());
//routes
app.use("/api/auth/",authRoutes);
module.exports = app;