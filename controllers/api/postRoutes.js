const router = require('express').Router();
const { Post, Comment, User } = require('../../models');

router.get('/:id', async (req, res) => {
    try {
        const postObj = await Post.findByPk(req.params.id);
        if (postObj) {
            const post = postObj.get({ plain: true });
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "The ID was not found" });
        }
    } catch (error) {
        res.status(400).json({ message: "Error searching for the Post ID" });
    }
});

router.put('/', async (req, res) => {
    try {
        const { post_id, title, content } = req.body;
        const postObj = await Post.findByPk(post_id);
        if (postObj) {
            postObj.title = title;
            postObj.content = content;
            postObj.save();
            const post = postObj.get({ plain: true });
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "The ID was not found" });
        }
    } catch (error) {
        res.status(400).json({ message: "Error searching for the Post ID" });
    }
});

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
});

router.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(postData);
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router;
