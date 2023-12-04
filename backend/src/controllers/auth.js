const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPwdValid = await bcrypt.compareSync(password, user.password);

    if (!isPwdValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
        { userId: user.id, username: user.username }, // Include only necessary information in the token payload
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' } // Set an expiration time for the token
    );

    // Set the token as an HttpOnly cookie
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
        { userId: newUser.id, username: newUser.username }, // Use newUser.id and newUser.username
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' }
    );
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.json({ newUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};


exports.checkAuth = (req, res, next) => {
  // ดึง token จาก headers
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed: No token provided' });
  }

  try {
    // ตรวจสอบ token
    req.user = jwt.verify(token, process.env.JWT_SECRET_KEY);  // เพิ่มข้อมูล user ลงใน request object
    res.json({ message: 'This is a protected route', user: req.user });
    //next();  // ไปทำ middleware ถัดไป
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed: Invalid token' });
  }
};

exports.logoutUser = (req, res) => {
  // Invalidate the token (you might want to implement token blacklisting)
  res.clearCookie('token'); // Clear the token cookie

  res.json({ message: 'Logout successful' });
};


