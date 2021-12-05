const router = require('express').Router();
const { Post, Comment, User } = require('../models');

const renderPosts = async (req, res) => {
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
                attributes: ['username'],
            }
        ]
    });
    const loggedIn = req.session.user_id ? true : false;
    const cleanedPosts = postData.map((post) => {
        const postObj = post.get({ plain: true });
        postObj.loggedIn = loggedIn;
        return postObj;
    });
    res.render('homepage', { posts: cleanedPosts, loggedIn: loggedIn });
}

router.get('/', renderPosts);

router.get('/login', async (req, res) => {
    const loggedIn = req.session.user_id ? true : false;
    res.render('login', { loggedIn: loggedIn });
});

router.get('/register', async (req, res) => {
    const loggedIn = req.session.user_id ? true : false;
    res.render('register', { loggedIn: loggedIn });
});

module.exports = router;
