const express = require('express');
const connection = require("../config/dataBase");
const router = express.Router();

router.get('/', function (req, res, next) {
    const sql = `SELECT * FROM products;`
    connection.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(JSON.stringify(result));
    })
});

module.exports = router;