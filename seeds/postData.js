const { Post } = require('../models');

const postData = [
    {
        title: 'Building Shit',
        content: 'Sometimes you just have to build some shit. And then get it working.',
        user_id: 1
    },
    {
        title: 'Poke shits',
        content: 'Gotta catch them all. Do I need to say more?',
        user_id: 2
    },
    {
        title: 'My thoughts on WoW',
        content: 'They need to stop bullshittin and get their shit together!',
        user_id: 3
    },
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
