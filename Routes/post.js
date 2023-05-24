const express = require('express');
const router = express.Router();

const {
    getAllPosts,
    getUserPost,
    createPost,
    deletePost,
    updatePost,
    likePost,
    dislikePost,
} = require('../Controllers/post.js');

router.route('/').post(createPost).get(getAllPosts);
router.route('/:userId').get(getUserPost).patch(updatePost).delete(deletePost)
router.route('/:id/like').post(likePost);
router.route('/:id/dislike').post(dislikePost)

module.exports = router;