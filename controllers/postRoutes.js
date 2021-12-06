const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

const getPostInfo = async (postId) => {
    return await Post.findByPk(postId, {
        attributes: ['id', 'title', 'content', 'createdAt'],
        include: [
            {
                model: Comment,
                order: ['createdAt', 'ASC'],
                attributes: ['content', 'createdAt'],
                include: [
                    {
                        model: User,
                        attributes: ['username'],
                    }
                ]
            },
            {
                model: User,
                attributes: ['username'],
            }
        ]
    });
}

router.get('/create', withAuth, async (req, res) => {
    const loggedIn = req.session.user_id ? true : false;
    res.render('create-post', { loggedIn: loggedIn });
});

router.get('/:id', async (req,res) => {
    const postData = await getPostInfo(req.params.id);
    if (postData) {
        const post = postData.get({ plain: true });
        post.userPost = post.user_id === req.session.user_id;
        post.loggedIn = req.session.user_id !== null;
        res.render('single-post', { post: post, loggedIn: post.loggedIn });
    } else {
        res.render('not-found');
    }
});

router.get('/update/:id', withAuth, async (req,res) => {
    const postData = await getPostInfo(req.params.id);
    if (postData) {
        const loggedIn = (req.session.user_id !== null) ? true : false;
        res.render('update-post', { loggedIn: loggedIn });
    } else {
        res.render('not-found');
    }
});

router.get('/comment/:id', withAuth, async (req, res) => {
    const loggedIn = req.session.user_id ? true : false;
    res.render('add-comment', { loggedIn: loggedIn });
});

module.exports = router;
