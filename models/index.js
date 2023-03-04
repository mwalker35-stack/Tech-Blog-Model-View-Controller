// import models
const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');


// Blog belongsTo User
Blog.belongsTo(User, {
  foreignKey: 'user_id',
});

// User have many Blogs
User.hasMany(Blog, {
  foreignKey: 'user_id',
});

Comment.belongsTo(Blog,{
    foreignKey: 'blog_id'
})

Blog.hasMany(Comment,{
    foreignKey:'blog_id'
})

Comment.belongsTo(User,{
    foreignKey: 'user_id'
})

User.hasMany(Comment,{
    foreignKey: 'user_id'
})

module.exports = {
  User,
  Blog,
  Comment,
};
