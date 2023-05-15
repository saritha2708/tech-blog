const router = require('express').Router();
const withAuth = require('../../utils/auth');
const {renderHomepage,
     renderDashboard, 
     renderLogin, 
     renderSignup, 
     renderBlog, 
     renderNewPost} = require('../../controllers/htmlRoutes');

router.get('/', renderHomepage );

router.get('/dashboard', withAuth, renderDashboard);

router.get('/login', renderLogin);

router.get('/signup', renderSignup);

router.get('/blog/:id', withAuth, renderBlog);

router.get('/newPost', withAuth, renderNewPost);


module.exports = router;

