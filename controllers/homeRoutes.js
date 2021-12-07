const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

const renderPosts = async (user_id, where) => {
    const postData = await Post.findAll({
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
                attributes: ['id', 'username'],
            }
        ],
        where: where,
    });
    const cleanedPosts = postData.map((post) => {
        const postObj = post.get({ plain: true });
        postObj.loggedIn = user_id ? true : false;
        postObj.userPost = postObj.user.id === user_id;
        return postObj;
    });
    return cleanedPosts;
    // res.render('homepage', { posts: cleanedPosts, loggedIn: loggedIn });
}

router.get('/', async (req, res) => {
    const loggedIn = req.session.user_id ? true : false;
    const cleanedPosts = await renderPosts(req.session.user_id, {});
    res.render('homepage', { posts: cleanedPosts, loggedIn: loggedIn });
});

router.get('/dashboard', withAuth, async (req, res) => {
    const loggedIn = req.session.user_id ? true : false;
    const where = {
        user_id: req.session.user_id,
    };
    const cleanedPosts = await renderPosts(req.session.user_id, where);
    res.render('homepage', { posts: cleanedPosts, loggedIn: loggedIn });
});

router.get('/login', async (req, res) => {
    const loggedIn = req.session.user_id ? true : false;
    res.render('login', { loggedIn: loggedIn });
});

router.get('/register', async (req, res) => {
    const loggedIn = req.session.user_id ? true : false;
    res.render('register', { loggedIn: loggedIn });
});

module.exports = router;
