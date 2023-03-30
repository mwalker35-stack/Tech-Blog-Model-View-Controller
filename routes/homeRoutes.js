const router = require('express').Router();
const { Blog, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// Get all blogs for home page
router.get('/', async (req, res) => {
    const techBlogData = await Blog.findAll({
        include: [
            {
                model: User,
                attributes: ['id', 'username', 'email']
            }, 
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'date_created', 'blog_id'],
                include: {
                    model: User,
                    attributes: ['id', 'username', 'email']
                }
            }
        ]
    })
    const blogs = await techBlogData.map(blog => {
        return blog.get({ plain: true })
    })
    console.log(blogs)
    res.render("homepage", { blogs, logged_in: req.session ? req.session.logged_in : false })
})

router.get('/login', async (req, res) => {
    res.render('login')
})

router.get('/blog/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            attributes: [
                'id',
                'title',
                'content',
                'date_created',
                'user_id'
            ],
            include: [
                {
                    model: User,
                    attributes: ['id', 'username', 'email']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'date_created', 'blog_id', 'user_id'],
                    include: {
                        model: User,
                        attributes: ['id', 'username', 'email']
                    }
                }
            ]
        })
        const blog = blogData.get({ plain: true })
        res.render('blog', {
            blog,
            logged_in: true
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})


router.get('/editcomment', async (req, res) => {
    try {
        const blogData = await Comment.findByPk(req.params.id, {
            attributes: [
                'id',
                'title',
                'content',
                'date_created',
                'user_id'
            ],
            include: [
                {
                    model: User,
                    attributes: ['id', 'username', 'email']
                },
                {
                    model: blog,
                    attributes: ['id', 'title', 'date_created', 'content', 'date_created', 'user_id'],
                    include: {
                        model: User,
                        attributes: ['id', 'username', 'email']
                    }
                }
            ]
        })
        const blog = blogData.get({ plain: true })
        res.render('editcomment', {
            comment,
            logged_in: true
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

// router.get('/createblog', async (req, res) => {
//     res.render('createblog')
// })

router.get('/createblog', withAuth, async(req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_test, {
            attributes: { exclude: ['password']},
            include: [{model: Blog, attributes: ['id', 'title', 'content', 'user_id', 'date_created']}],
        })

        console.log(userData)
        const user = userData.get({ plain: true })
        console.log(user)
        //res.render('createblog')
        res.render('createblog', {
            ...user,
            logged_in: true
        })
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})




router.get('/username', async (req, res) => {
    res.render("profile")
})

// router.get('/addcomment', async (req, res) => {
//     res.render('addcomment')
// })


router.get('/addcomment', async (req, rest) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Blog, attributes: ['id', 'comment_text', 'date_created', 'blog_id', 'user_id'] }],
        })

        const user = userData.get({ plain: true })
        //console.log(user)
        res.render('addcomment', {
            ...comment,
            logged_in: req.session.logged_in
        })
        //res.render('createpost')
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})


router.get('/editblog/:id', async(req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            attributes: [
                'id',
                'title',
                'content',
                'date_created'
            ],
            include: [
                {
                    model: User,
                    attributes: ['id','name', 'email']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'blog_id', 'user_id', 'date_created'],
                    include: {
                        model: User,
                        attributes: ['id','name', 'email']
                    }
                }
            ]
        })
        const post = postData.get({ plain: true })
        res.render('editblog', {
            ...post,
            logged_in: req.session.logged_in
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

router.get('/editcomment/:id', async(req, res) => {
    try {
        const postData = await Comment.findByPk(req.params.id, {
            attributes: [
                'id', 
                'comment_text',
                'blog_id', 
                'date_created'
            ],
            include: [
                {
                    model: User,
                    attributes: ['id','name', 'email']
                },
                {
                    model: Blog,
                    attributes: ['id','title','content','date_created'],
                    include: {
                        model: User,
                        attributes: ['id','name', 'email']
                    }
                }
            ]
        })
        const comment = blogData.get({ plain: true })
        res.render('editcomment', {
            ...comment,
            logged_in: req.session.logged_in
        })
    } catch(err) {
        res.status(500).json(err)
    }
})


module.exports = router