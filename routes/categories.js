const express = require('express');
const router = express.Router();
const connection = require('../config/dataBase');

router.get('/', (req, res, next) => {
    const sql = `SELECT * FROM categories;`
    connection.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        res.send(JSON.stringify(result));
    })
});

router.get('/:id', (req, res, next) => {
    console.log(req.params.id)
})

module.exports = router;