const router = require('express').Router();
const { Blog, Comment, User } = require('../../models')
const withAuth = require('../../')

router.post('/', async(req, res) => {
    try {
        const newComment = await User.create(req.body)
        req.session.save(()=> {
            req.session.user_test = newUser.id
            req.session.user_id = newUser.user_id
            res.status(200).json(newUser)
        })
    } catch(err) {
        res.status(500).json(err)
    }
});

module.exports = router