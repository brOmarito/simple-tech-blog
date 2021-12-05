const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/create', withAuth, async (req, res) => {
    const loggedIn = req.session.user_id ? true : false;
    res.render('create-post', { loggedIn: loggedIn });
});

router.get('/:id', async (req,res) => {
    const postData = await Post.findByPk(req.params.id, {
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
    if (postData) {
        const post = postData.get({ plain: true });
        post.loggedIn = (req.session.user_id !== null) ? true : false;
        res.render('single-post', { post: post, loggedIn: post.loggedIn });
    } else {
        res.render('not-found');
    }
});

router.get('/comment/:id', withAuth, async (req, res) => {
    const loggedIn = req.session.user_id ? true : false;
    res.render('add-comment', { loggedIn: loggedIn });
});

module.exports = router;
