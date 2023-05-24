const User = require('../models/User.js')
const jwt = require('jsonwebtoken');
const {UnauthenticatedError} = require('../errors')


const auth = async(req, res, next) => {
     
    // check Headers
    const authHeader = req.header("Authorization");
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        throw new UnauthenticatedError('Authentication failed')
    }

    const token = authHeader.slice(7, authHeader.length).trimLeft();
    console.log(token);
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = payload;
        next();
    }
    catch(error) {
        throw new UnauthenticatedError('Authentication Error')
    }
}
module.exports = auth