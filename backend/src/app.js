const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');
const app = express();
const router = require('./routes/route')
require('dotenv').config()
// Middleware

app.use(express.json());

// Connect to MongoDB
// Routes

app.use('/auth', authRoutes);
app.use('/data', dataRoutes);
app.use('/api',router)


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});