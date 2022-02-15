const express = require('express');
const {checkLogInOutButtonOptions} = require("./login");
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    const options = checkLogInOutButtonOptions(req);
    res.render('index', options);

});

module.exports = router;
