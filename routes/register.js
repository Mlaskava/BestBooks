const express = require('express');
const router = express.Router();
const connection = require('../config/dataBase');
const bcrypt = require('bcrypt');

router.get('/', function(req, res, next) {
    res.render('register');
});

router.post('/', async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const sql = `INSERT INTO users (username, email, password) VALUES ('${req.body.username}', '${req.body.email}', '${hashedPassword}')`
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Inserted " + 1 + " record ");
        });
        res.redirect('/login');
    }
    catch {
        res.redirect('/register');
    }

});

module.exports = router;