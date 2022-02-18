const express = require('express');
const {checkLogInOutButtonOptions} = require("./login");
const {sendUserData, sendCategoriesAndProducts} = require("../config/httpHelper");
const connection = require("../config/dataBase");
const bcrypt = require("bcrypt");
const router = express.Router();
const checkAuthenticated = require('./login').checkAuthenticated;

router.get('/', checkAuthenticated, (req, res, next) => {
    const options = checkLogInOutButtonOptions(req);
    const sql = `SELECT * FROM users WHERE id = ${req.user.id};`
    connection.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        options.userData = result[0];
        res.render('account', options);
    });
});

module.exports = router;
