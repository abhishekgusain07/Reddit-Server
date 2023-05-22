const express = require('express');
const router = express.Router();

const {
    getAllPosts,
    getSinglePost,
    createPost,
    deletePost,
    updatePost,
} = require('../Controllers/post.js');

router.route('/').post(createPost).get(getAllPosts);
router.route('/:id').get(getSinglePost).patch(updatePost).delete(deletePost)

module.exports = router;