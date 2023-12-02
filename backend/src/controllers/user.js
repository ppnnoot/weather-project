
const User = require('../models/userModel');
async function fetchAllUser(req,res){
    try {
        const user = await User.find()
        if(!user) return res.status(404).json({err: 'err'})
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


module.exports = {fetchAllUser,fetch}