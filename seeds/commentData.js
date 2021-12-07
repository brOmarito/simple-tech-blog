const { Comment } = require('../models');

const commentData = [
    {
        content: 'Yeah, build that stuff!',
        user_id: 2,
        post_id: 1,
    },
    {
        content: 'Or just chill, man.',
        user_id: 3,
        post_id: 1,
    },
    {
        content: 'Thanks for the comments!',
        user_id: 1,
        post_id: 1,
    },
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
