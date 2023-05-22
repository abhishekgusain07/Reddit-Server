const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js')

// Register User First Time
const register = async(req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            location,
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password,salt);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password:passwordHash,
            location,
        })
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
    catch (err){
        res.status(500).json({msg:err.message})
    }
}
const login = async(req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email:email});
        if(!user) {
            res.status(400).json({msg:`User Does Not Exist! Please Register First`});
        }
        const checkPassword = await bcrypt.compare(password, user.password);
        if(!checkPassword)res.status(404).json({msg: `Invalid Password`});
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
        delete user.password
        res.status(200).json({token, user});
    }
    catch(error) {
        res.status(404).json({msg:error.message});
    }
}
module.exports =  {
    register,
    login,
}