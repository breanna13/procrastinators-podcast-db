const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER || "breanna.white", // Change this to your username
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "procrastinators_podcast",
  password: process.env.DB_PASSWORD || "", // Empty password for local dev
  port: process.env.DB_PORT || 5432,
});

module.exports = pool;
