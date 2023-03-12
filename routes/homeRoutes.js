const router = require('express').Router();
const { Blog, Comment, User } = require('../models');

// Get all blogs for home page
router.get('/', async (req, res) => {
    const techBlogData = await Blog.findAll({
        // include: [
        //     {
        //         model: Blog,
        //         attributes: ['blog', 'comment'],
        //     }
        // ]
    })
    console.log(techBlogData)
})

module.exports = router