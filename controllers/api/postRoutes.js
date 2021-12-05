const router = require('express').Router();
const { Post, Comment, User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const postObj = req.body;
        postObj.user_id = req.session.user_id;
        const postData = await Post.create(postObj);
        const post = postData.get({ plain: true });
        res.status(200).json(post);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/comment', async (req, res) => {
    try {
        const commentObj = req.body;
        commentObj.user_id = req.session.user_id;
        const commentData = await Comment.create(commentObj);
        const comment = commentData.get({ plain: true });
        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json(error);
    }
})

module.exports = router;
