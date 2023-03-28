const router = require('express').Router();
const { Blog, Comment, User } = require('../../models')
const withAuth = require('../../')

router.post('/', async(req, res) => {
    try {
        const newComment = await Comment.create(req.body)
        req.session.save(()=> {
            req.session.user_test = newUser.id
            req.session.user_id = newUser.user_id
            res.status(200).json(newUser)
        })
    } catch(err) {
        res.status(500).json(err)
    }
});

// router.put('/:id', withAuth, async(req, res) => {
//     try {
//     const commentData = await Comment.update({
//         ...req.body,
//         user_cid: req.session.user_test,
//         post_id: req.params.id
//     },
//     {
//         where: {
//             id: req.params.id
//         }
//     })
//     if(!commentData){
//         res.status(404).json({message: 'No comments were found with that ID'})
//         return
//     }
//     res.status(200).json(commentData)
// } catch (err) {
//     res.status(500).json(err)
// }
// })

// router.delete('/:id', withAuth, async(req, res) => {
//     try {
//         console.log('PARAMS',req.params.id)
//         const commentData = await Comment.destroy({
//             where: {
//                 id: req.params.id,
//                 //id: req.body.id,
                
//             }
//     })
//         if(!commentData){
//             res.status(404).json({ message: 'No comments with ID' })
//             return
//         }
//         res.status(200).json(commentData)
//     } catch(err) {
//         res.status(500).json(err)
//     }
// })

module.exports = router