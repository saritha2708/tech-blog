const { User } = require('../models');

const createUser = async (req, res) => {
    try {
        const userData = await User.create(req.body);
    
        const user = userData.get({ plain: true });
    
        req.session.save(() => {
          req.session.user_id = user.id;
          req.session.logged_in = true;
          req.session.name = user.name;
          req.session.user = user;
    
          res.status(200).json(userData);
        });
      } catch (err) {
        res.status(400).json(err);
      }
};

const loginUser = async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });
    
        if (!userData) {
          res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' });
          return;
        }
    
        const validPassword = await userData.checkPassword(req.body.password);
    
        if (!validPassword) {
          res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' });
          return;
        }
    
        req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.logged_in = true;
          
          res.json({ user: userData, message: 'You are now logged in!' });
        });
    
      } catch (err) {
        res.status(400).json(err);
      }
};

const logoutUser = async (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
          res.status(204).end();
        });
      } else {
        res.status(404).end();
      }
};

module.exports = {
    createUser,
    loginUser,
    logoutUser,
};