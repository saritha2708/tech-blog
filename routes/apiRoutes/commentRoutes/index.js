const router = require('express').Router();
const createComment = require('../../../controllers/commentRoutes');
const withAuth = require('../../../utils/auth');

router.post('/', withAuth, createComment);


module.exports = router;