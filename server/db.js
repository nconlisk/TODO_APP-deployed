// setting up db for deploying

const Pool = require('pg').Pool    // from postgres docs
require('dotenv').config()         // for using .env for secret info

const pool = new Pool({
    user: process.env.PGUSERNAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DBPORT,
    database: 'todoapp'
})

module.exports = pool