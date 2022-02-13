var express = require('express');
var router = express.Router();
const checkAuthenticated = require('./login').checkAuthenticated;

/* GET home page. */
router.get('/', checkAuthenticated, (req, res, next) => {
    res.render('cart');
});

module.exports = router;