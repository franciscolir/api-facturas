const { DataTypes } = require('sequelize');
const db = require('../../config/db');

const User = db.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
  },
}, {
  timestamps: false,
});

module.exports = User;
