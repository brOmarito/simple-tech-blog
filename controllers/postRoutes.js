const router = require('express').Router();
const { Post, Comment, User } = require('../models');

router.get('/create', async (req, res) => {
    res.render('create-post');
});

module.exports = router;
