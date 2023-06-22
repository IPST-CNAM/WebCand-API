var express = require("express");
var router = express.Router();

const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'user',
    password: 'user',
    database: 'TestWebcand'
});

/* Return "API is working properly" if connection
to mariadb is successful */
router.get("/", function(req, res, next) {
    pool.getConnection()
        .then(conn => {
            conn.query("SELECT * FROM users")
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