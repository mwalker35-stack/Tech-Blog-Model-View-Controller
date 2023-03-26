const router = require('express').Router();
const { Blog, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// Get all blogs for home page
router.get('/', async (req, res) => {
    const techBlogData = await Blog.findAll({
        include: [
            {
                model: User,
            }
        ]
    })
    const blogs = await techBlogData.map(blog => {
        return blog.get({plain: true})
    })
    console.log(blogs)
    res.render("homepage", {blogs, logged_in: req.session?req.session.logged_in:false})
})

router.get('/login', async(req, res) => {
    res.render('login')
})

router.get('/blog', async(req, res) => {
    res.render('blog')
})

router.get('/editcomment', async(req, res) => {
    res.render('editcomment')
})

router.get('/createblog', async(req, res) => {
    res.render('createblog')
})

router.get('/addcomment', async(req, res) => {
    res.render('addcomment')
})

router.get('/addcomment', async(req, res) => {
    res.render('addcomment')
})


router.get('/addcomment', async(req, rest) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password']},
            include: [{model: Blog, attributes: ['id', 'comment_text', 'date_created', 'blog_id', 'user_id']}],
        })

        const user = userData.get({ plain: true })
        //console.log(user)
        res.render('addcomment', {
            ...user,
            logged_in: true
        })
        //res.render('createpost')
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})


module.exports = router