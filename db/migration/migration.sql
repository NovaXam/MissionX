\c mission_x_dev;

CREATE TABLE IF NOT EXISTS users (
  id serial PRIMARY KEY,
  name VARCHAR(64),
  password TEXT
  );

CREATE TABLE IF NOT EXISTS gallery (
  id INTEGER PRIMARY KEY,
  url TEXT UNIQUE,
  earth_data VARCHAR(65),
  rover_name VARCHAR(20),
  status VARCHAR(20),
  user_id INTEGER REFERENCES users,
  landing_date VARCHAR(20)
  );
