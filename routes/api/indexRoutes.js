const router = require('express').Router();
const blogRoutes = require('./BlogRoutes');
const commentRoutes = require('./CommentRoutes');
const userRoutes = require('./UserRoutes');


router.use('/blog', blogRoutes);
router.use('/comment', commentRoutes);
router.use('/user', userRoutes);

module.exports = router;