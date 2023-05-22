const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,'Please Provide first name'],
        minLength:3,
        maxLength:50,
    },
    lastName:{
        type:String,
        required:[true,'Please Provide last name'],
        minLength:3,
        maxLength:50,
    },
    email:{
        type:String,
        required:[true,'Please Provide Email'],
        match:[
           /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
           'Please provide valid email',
        ],
        unique:true,
    },
    password: {
        type:String,
        required:[true,'please provide password'],
        minLength:6,
        maxLength:100,
    },
    userPosts: {
        type: Array,
        default: [],
    },
    location:{
        type:String,
        required:[true,'please provide location'],
    }
}, {timestamps:true});
module.exports = mongoose.model('User', UserSchema);