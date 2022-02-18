const express = require('express');
const router = express.Router();
const connection = require('../config/dataBase');
const bcrypt = require('bcrypt');
const {checkLogInOutButtonOptions} = require("./login");

router.get('/', function (req, res, next) {
    const options = checkLogInOutButtonOptions(req);
    res.render('register', options);
});

router.post('/', async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const sql = `INSERT INTO users (username, email, first_name, last_name, address, password) VALUES ('${req.body.username}', '${req.body.email}', '${req.body.firstname}', '${req.body.lastname}', '${req.body.adress}', '${hashedPassword}')`
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Inserted " + 1 + " record ");
        });
        res.redirect('/login');
    } catch {
        res.redirect('/register');
    }

});

module.exports = router;