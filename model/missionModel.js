const db = require('../db/config');
const bcrypt = require('bcrypt');

const Model = {};

Model.findAll = (id) => {
  return db.many(
    `SELECT
      gallery.id,
      gallery.photo_id,
      gallery.url,
      gallery.earth_data,
      gallery.rover_name,
      gallery.status,
      gallery.user_id,
      gallery.landing_date
    FROM
      gallery
    INNER JOIN users ON gallery.user_id = users.id
    WHERE
      gallery.user_id = $/user_id/
     `, id);
};

Model.create = (item) => {
  return db.one(`
    INSERT INTO gallery (
    photo_id,
    url,
    earth_data,
    rover_name,
    status,
    user_id,
    landing_date)
  VALUES (
    $/photo_id/,
    $/url/,
    $/earth_data/,
    $/rover_name/,
    $/status/,
    $/user_id/,
    $/landing_date/
  )
    RETURNING *
    `, item);
};

Model.destroy = (item) => {
  return db.none(
    `DELETE FROM gallery
    WHERE
    photo_id = $/photo_id/
    AND
    user_id = $/user_id/
    `,
    item);
};

module.exports = Model;
