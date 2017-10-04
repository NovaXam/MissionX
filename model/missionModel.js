const db = require('../db/config');
const bcrypt = require('bcrypt');

const Model = {}

Model.findAll = () => {
  return db.many(
    `SELECT * FROM gallery
      INNER JOIN user ON
      (gallery.user_id = user.id)`
      );
}

Model.findOne = (item) => {
  return db.one(`
    SELECT * FROM gallery
    WHERE id = $1
    RETURNING*,`
    item)
}

Model.create = (item) => {
  return db.one(
    `INSERT INTO gallery (
    id,
    name,
    url,
    earth_data,
    rover_name,
    status,
    user_id,
    landing_date)
  VALUES (
    $/id/,
    $/name/,
    $/url/,
    $/earth_data/,
    $/rover_name/,
    $/status/,
    $/user_id/,
    $/landing_date/
  )
    RETURNING*`,
  item);
}

Model.destroy = (id) => {
  return db.none(
    `DELETE FROM gallery
    WHERE id = $1`,
    id);
}

module.exports = Model;
