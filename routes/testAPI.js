var express = require("express");
var router = express.Router();
require('dotenv').config();

const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5, // Adjust as per your requirements
});

/* Return "API is working properly" if connection
to mariadb is successful */
router.get("/", function(req, res, next) {
    console.log(process.env.DB_HOST)
    console.log(process.env.DB_PORT)
    console.log(process.env.DB_USER)
    console.log(process.env.DB_PASSWORD)
    console.log(process.env.DB_NAME)
    pool.getConnection()
        .then(conn => {
            conn.query("SELECT * FROM temptest;")
                .then((rows) => {
                    res.send("API is working properly");
                    conn.end();
                })
                .catch(err => {
                    console.log(err);
                    conn.end();
                })
        }).catch(err => {
            console.log(err);
        });
});

module.exports = router;