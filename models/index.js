const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// User - Comment relationship
User.hasMany(Comment, {
    foreignKey: 'user_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

// User - Post relationship
User.hasMany(Post, {
    foreignKey: 'user_id',
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// Comment - Post relationship
Post.hasMany(Comment, {
    foreignKey: 'post_id',
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
});

module.exports = { User, Post, Comment };
