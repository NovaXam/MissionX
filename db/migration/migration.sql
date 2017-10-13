\c mission_x_dev;

CREATE TABLE IF NOT EXISTS users (
  id serial PRIMARY KEY,
  name VARCHAR(64) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL
  );

CREATE TABLE IF NOT EXISTS gallery (
  id SERIAL,
  photo_id INTEGER NOT NULL,
  url TEXT NOT NULL,
  earth_data VARCHAR(65) NOT NULL,
  rover_name VARCHAR(20) NOT NULL,
  status VARCHAR(20) NOT NULL,
  user_id INTEGER REFERENCES users NOT NULL,
  landing_date VARCHAR(20) NOT NULL,
  PRIMARY KEY (photo_id, user_id)
  );
