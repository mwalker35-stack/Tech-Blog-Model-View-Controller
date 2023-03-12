const router = require('express').Router();
const blogRoutes = require('./Blog');
const commentRoutes = require('./Comment');
const userRoutes = require('./User');


router.use('/blog', blogRoutes);
router.use('/comment', commentRoutes);
router.use('/user', userRoutes);

module.exports = router;