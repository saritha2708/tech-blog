const router = require('express').Router();
const {createBlog,
       updateBlog,
       deleteBlog } = require('../../../controllers/blogRoutes');

const withAuth = require('../../../utils/auth');       

router.post('/', withAuth, createBlog);

router.put('/:id', withAuth, updateBlog);

router.delete('/:id', withAuth, deleteBlog);

module.exports = router;