const getAllPosts = async(req, res) => {
    res.send('Get all Post');
}
const getSinglePost = async(req, res) => {
    res.send('Get single post');
}
const createPost = async(req, res) => {
    res.send('post created');
}
const deletePost = async(req, res) => {
    res.send('Post Deleted');
}
const updatePost = async(req, res) => {
    res.send('Post deleted');
}

module.exports = {
    getAllPosts,
    getSinglePost,
    createPost,
    deletePost,
    updatePost,
}