const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');
const app = express();
const router = require('./routes/route')
const cors = require('cors')
require('dotenv').config()
// Middleware

app.use(express.json());
app.use(cors())
// Connect to MongoDB
// Routes

const opts = {};
//opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_SECRET_KEY;



app.use('/auth', authRoutes);
app.use('/data', dataRoutes);
app.use('/api',router)


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});