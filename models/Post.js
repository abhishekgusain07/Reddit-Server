const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    userId: {
        type:String,
        required:true,
    },
    firstName: {
        type:String,
        required:[true, 'please provide first Name']
    },
    lastName: {
        type:String,
        required:[true, 'please provide last name']
    },
    description:{
        type:String,
        required:[true,'provide with description']
    },
    tags:{
        type:Array,
        required:[true,'Please Provide with the tag']
    },
    likes:{
        type: Map,
        of: Boolean,
    },
    dislikes:{
        type: Map,
        of: Boolean,
    },
    comments:[
        {
            userId:{type: String},
            comment:{type: String}
        }
    ]
}, {timestamps:true})

module.exports = mongoose.model("Post", PostSchema);
