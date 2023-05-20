const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please Provice name'],
        minLength:3,
        maxLength:50,
    },
    email:{
        type:String,
        required:[true,'Please Provide Email'],
        match:[
           / ^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
           'Please provide valid email',
        ],
        unique:true,
    },
    password: {
        type:String,
        required:[true,'please provide password'],
        minLength:6,
        maxLength:12,
    }
}, {timestamps:true});
module.exports = mongoose.model('User', UserSchema);