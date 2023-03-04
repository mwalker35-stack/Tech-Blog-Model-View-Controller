const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Comment extends Model {
 
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,     
    },
    date_created: {
        type: DataTypes.DATE,
        allowNull:false,
        defaultValue: DataTypes.NOW,
    }, 
    blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'blog',
            key: 'id'
        }
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model:'user',
            key: 'id'
        }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;