const { User, Blog, Comment } = require('../models');

// Renders homepage with all blogs
const renderHomepage = async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],              
                },
                {
                    model: Comment,
                    attributes: ['id', 'description', 'blog_id', 'user_id'],
                    include: {
                        model: User,
                        attributes: ['name'],
                    },
                }
            ],
        });

        const blogs = blogData.map((blog) => blog.get({ plain: true }));
        
        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in || false,
            user: req.session.user || null,
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

// Renders dashboard with user's blogs
const renderDashboard = async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
          attributes: { exclude: ['password'] },
          include: [{ model: Blog }],
        });
    
        const user = userData.get({ plain: true });
          
        res.render('dashboard', {
          ...user,
          logged_in: true
        });
      } catch (err) {
        res.status(500).json(err);
      }
};

// Renders login page
const renderLogin = async (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
      }
    
      res.render('login');
};

// Renders signup page
const renderSignup = async (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
      }
  
      res.render('signup');
};

// Renders blog so user can update it or delete it
const renderBlog = async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Comment,
                    attributes: ['id', 'description', 'blog_id', 'user_id'],
                    include: {
                        model: User,
                        attributes: ['name'],
                    },
                },
            ],
        });

        const blog = blogData.get({ plain: true });

        res.render('blog', {
            ...blog,
            logged_in: req.session.logged_in || false
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

// Renders new post page so user can create a new blog
const renderNewPost = async (req, res) => {
    try {
        res.render('newPost', {
            logged_in: req.session.logged_in || false
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    renderHomepage,
    renderDashboard,
    renderLogin,
    renderSignup,
    renderBlog,
    renderNewPost
};