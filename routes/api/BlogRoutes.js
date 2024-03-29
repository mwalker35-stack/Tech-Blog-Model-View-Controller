const router = require('express').Router();
const { Blog, Comment, User } = require('../../models')
const withAuth = require('../../utils/auth')

// The '/api/blog'   endpoint

router.get('/', async(req, res) => {
    try {
        let blogs = Blog.findAll()
        res.status(200).json({blogs})
    } catch (err){
        console.log(err)
    }
})

router.post('/', async(req, res) => {
    //get all blogs
    try {

        console.log(req.body)
        const newBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_test,
            // include: [{model: Comment}]
        })
        console.log(newBlog)
        res.status(200).json(newBlog)
    } catch (err){
        console.log(err)
        res.status(500).json(err)
    }
});

// DELETE A BLOG
router.delete('/:id', withAuth, async(req, res) => {
    try {
        // console.log('PARAMS', req.params.id)
        const postData =await Post.destroy({
            where: {
                id: req.params.id,
            }
        }) 
        if (!postData){
            res.status(404).json({message: 'No posts with that ID found'})
            return
        }
        res.status(200).json(postData)
    }  catch(err) {
        req.status(500).json(err)
    }
})


// UPDATE A BLOG

router.put('/:id', async(req, res) => {
    try {
    const postData = await Post.update({
        title: req.body.title,
        post: req.body.post
    },
    {
        where: {
            id: req.params.id
        }
    })
    if(!postData){
        res.status(404).json({message: 'No blogs found with that ID'})
        return
    }
    res.status(200).json(postData)
} catch (err) {
    res.status(500).json(err)
}
})

router.post('/addcomment/:id', async(req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_test,
            post_id: req.params.id
        
        })
        res.status(200).json(newComment)
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.put('/:id', withAuth, async(req, res) => {
    try {
        const blogData = await Blog.update({
            title: req.body.title,
            post: req.body.post
        },{
            where: {
                id: req.params.id
            }
        })
        if(!blogData){
            res.status(404).json({message: 'No post from user'})
            return
        }
        res.status(200).json(postData)
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router