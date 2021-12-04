const router = require('express').Router();
const { Post, Comment, User } = require('../models');

const renderPosts = async (req, res) => {
    const postData = await Post.findAll({
        attributes: ['title', 'content', 'createdAt'],
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
    const cleanedPosts = postData.map((post) => {
        const plainPost = post.get({ plain: true });
        const commentData = post.comments.map((comment) => comment.get({ plain: true }));
        plainPost.comments = commentData;
        return plainPost;
    });
    res.render('homepage', { posts: cleanedPosts });
}

router.get('/', renderPosts);

router.get('/login', async (req, res) => {
    res.render('login');
});

router.get('/register', async (req, res) => {
    res.render('register');
});

module.exports = router;
