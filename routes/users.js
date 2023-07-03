var express = require('express');
var router = express.Router();
require('dotenv').config();

const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 5, // Adjust as per your requirements
});


/* GET users listing using mariadb */
router.get('/', function (req, res, next) {
    pool.getConnection()
        .then(conn => {
            conn.query("SELECT * FROM temptest;")
                .then((rows) => {
                    res.send(rows);
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
