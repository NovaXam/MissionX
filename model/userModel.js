const db = require('../db/config');
const bcrypt = require('bcrypt');

const User = {}

User.findOne = (user) => {
  return db.oneOrNone(
    `SELECT * FROM users
    WHERE username = $/username/
    RETURNING*`,
    user)
  };

User.save = (user) => {
  return db.one(
    `INSERT INTO users (name, password, email)
    VALUES ($/name/, $/password/, $/email/)
    `,
    user);
};

User.comparePassword = (password, databasePass) => {
  return bcrypt.compareSync(password, databasePass);
};

module.exports = User;
