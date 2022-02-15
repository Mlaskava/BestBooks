var express = require('express');
const {checkLogInOutButtonOptions} = require("./login");
var router = express.Router();
const checkAuthenticated = require('./login').checkAuthenticated;

/* GET home page. */
router.get('/', checkAuthenticated, (req, res, next) => {
    const options = checkLogInOutButtonOptions(req);
    res.render('cart', options);
});

module.exports = router;