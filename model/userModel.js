const db = require('../db/config');
const bcrypt = require('bcrypt');

const User = {};

User.findOne = (user) => {
  console.log(user);
  return db.oneOrNone(
    `SELECT * FROM users
    WHERE name = $/name/
    `, user);
  };

User.save = (user) => {
  return db.none(
    `INSERT INTO users (name, password, email)
    VALUES ($/name/, $/password/, $/email/)
    `, user);
};

User.comparePassword = (password, databasePass) => {
  return bcrypt.compareSync(password, databasePass);
};

module.exports = User;
