const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');
const app = express();
const router = require('./routes/route')

require('dotenv').config()
console.log(process.env)

// Middleware
app.use(express.json());    

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/auth', authRoutes);
app.use('/data', dataRoutes);
app.use('/api',router)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});