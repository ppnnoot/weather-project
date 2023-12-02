const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res) => {
  const user = req.user;
  res
      .cookie('jwt', user.token, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
      })
      .status(201)
      .json({ id: user.id});
};

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    // Hash the password
    //const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      password,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully',data: newUser});
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username' });
    }

    // Check if the password is correct
    const isPwdInvalid = await bcrypt.compareSync(password,user.password)
    if(!isPwdInvalid){
      console.log("Password incorrect")
      return res.status(500).json({err: "Password ไม่ถููกต้อง"});
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, 'domhee', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.checkAuth = async (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.sendStatus(401);
  }
};