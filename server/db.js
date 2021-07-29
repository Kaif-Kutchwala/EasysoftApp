const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    password:"9503",
    host: "localhost",
    port: 5432,
    database: "easysoft"
});

module.exports = pool;