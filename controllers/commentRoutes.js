const { Comment } = require('../models');

// Creates new comment on blog post 
const createComment = async (req, res) => {
    try {
        const newBlog = await Comment.create({
            description: req.body.description,
            blog_id: req.body.blog_id,
            user_id: req.session.user_id,
        });
        res.status(200).json(newBlog);
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports = createComment;