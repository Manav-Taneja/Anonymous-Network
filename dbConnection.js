const { Pool } = require("pg")
require("dotenv").config()

const devConfig = `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const proConfig = process.env.DATABASE_URL; //heroku addons

const pool = new Pool({
  connectionString: "postgres://postgres:12345@localhost:5432/Annonymous",
  ssl: false
});


module.exports = pool;
