const Post = require('../models/Post.js');
const User = require('../models/User.js');

// Getting all posts
const getAllPosts = async(req, res) => {
    try{
        const post = await Post.find();
        res.status(200).json(post);
    }
    catch(error) {
        res.status(404).json({msg:error.message, custom:'cannot get All posts'});
    }
}
// creating Post
const createPost = async(req, res) => {
    try{
        const {userId, description, tags,body} = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName:user.firstName,
            lastName:user.lastName,
            description,
            likes:{},
            dislikes:{},
            tags,
            comments:[],
        });
        await newPost.save();
        const post = await Post.find();
        res.status(201).json(post);
    }
    catch(error) {
        res.status(409).json({msg:error.message, custom:'post not created'});
    }
}
const getUserPost = async(req, res) => {
    try{
        const {userId} = req.params;
        const post = await Post.find({userId});
        res.status(200).json(post);
    }
    catch(error) {
        res.status(409).json({msg:error.message, custom:'cannot get user posts'});
    }
}

const deletePost = async(req, res) => {
    try {
        const {id} = req.params;
        const post = await Post.findByIdAndDelete(id);
        const allPost = await Post.find();
        res.status(200).json(allPost);
    }
    catch(error) {
        res.status(404).json({msg: error.message ,custom:'something wrong happened during deleting post'});
    }
}
const updatePost = async(req, res) => {
    res.send('Post updated');
}
const likePost = async(req, res) => {
    try{
        const {id} = req.params;
        const {userId} = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes?.has(userId);
        const isDisliked = post.dislikes?.has(userId);
        if(isLiked) {
            post.likes.delete(userId);
        }else{
            post.likes.set(userId,true);
            if(isDisliked)
                post.dislikes.delete(userId);
        }
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { dislikes: post.dislikes},
            { new: true}
        );
        res.status(200).json(updatedPost);
    }
    catch(error){
        res.status(404).json({msg:error.message, custom:'something wrong happend during like'})
    }
}
const dislikePost = async(req, res) => {
    try{
        const {id} = req.params;
        const {userId} = req.body;
        const post = await Post.findById(id);
        const isLiked =  post.likes?.has(userId);
        const isDisliked =  post.dislikes?.has(userId);

        if(isDisliked) {
            post.dislikes.delete(userId);
        }
        else {
            post.dislikes?.set(userId, true);
            if(isLiked)
                post.likes?.delete(userId)
        }
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes},
            { dislikes: post.dislikes},
            { new: true}
        );
        // console.log(updatedPost);
        res.status(200).json(updatedPost);
    }
    catch(error) {
        res.status(404).json({msg: error.message, custom:'something wrong happened during dislikes'});
    }
}
module.exports = {
    getAllPosts,
    getUserPost,
    createPost,
    deletePost,
    updatePost,
    likePost,
    dislikePost,
}