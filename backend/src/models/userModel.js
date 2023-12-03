const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:{
    type: String,
    required: true,
    default: 'yaimak'
  }
});

// Method to compare passwords
const User = mongoose.model('User', userSchema);

module.exports = User;