const User = require('../models/userModel');
const bcrypt = require("bcrypt");

async function fetchUserById(req, res) {
    const { id } = req.user;
    console.log(id)
    try {
        const user = await User.findById(id);
        res.status(200).json({id:user.id,detail: 'asdadad'});
    } catch (err) {
        res.status(400).json(err);
    }
}

async function fetchAllUser(req,res){
    try {
        const user = await User.find()
        if (!user || user.length === 0) {
            return res.status(404).json({ err: 'No users found' });
        }
        return res.status(200).json(user)
    }catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function fetch(req,res){
    try {
        return res.json('sadadadada')
    }catch(err){

    }
}

async function signup(req,res){
    try {
        const { username, password } = req.body;

        // Check if the username is already taken
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username is already taken' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hashSync(password, 8);

        // Create a new user
        const newUser = new User({
            username: username,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully',data: newUser});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}


module.exports = {fetchAllUser,fetch,signup,fetchUserById}