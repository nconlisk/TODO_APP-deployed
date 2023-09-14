// setting up db for deploying

const Pool = require('pg').Pool    // from postgres docs
require('dotenv').config()         // for using .env for secret info

const pool = new Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.DBPORT,
    database: process.env.PG_DATABASE
})

module.exports = pool
