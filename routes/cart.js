const express = require('express');
const {checkLogInOutButtonOptions} = require("./login");
const router = express.Router();
const checkAuthenticated = require('./login').checkAuthenticated;

router.get('/', checkAuthenticated, (req, res, next) => {
    const options = checkLogInOutButtonOptions(req);
    res.render('cart', options);
});

module.exports = router;