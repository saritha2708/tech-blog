const { Blog} = require('../models');

// Creates new blog
const createBlog = async (req, res) => {
    try {
        const newBlog = await Blog.create({
            title: req.body.title,
            description: req.body.description,
            user_id: req.session.user_id,
        });
        res.status(200).json(newBlog);
    } catch (err) {
        res.status(400).json(err);
    }
};

// Updates blog
const updateBlog = async (req, res) => {
    try {
        const updateBlog = await Blog.update({
            title: req.body.title,
            description: req.body.description,
        },
        {
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(updateBlog);
    } catch (err) {
        res.status(400).json(err);
    }
};

// Deletes blog
const deleteBlog = async (req, res) => {
    try {
        const deleteBlog = await Blog.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(deleteBlog);
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports = {
    createBlog,
    updateBlog,
    deleteBlog,
};