const { Post } = require('../models');

const postData = [
    {
        title: 'Building Stuff',
        content: 'Sometimes you just have to build some stuff. And then get it working.',
        user_id: 1
    },
    {
        title: 'Poke shits',
        content: 'Gotta catch them all. Do I need to say more?',
        user_id: 2
    },
    {
        title: 'My thoughts on WoW',
        content: 'They need to stop messing around and get their stuff together!',
        user_id: 3
    },
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
