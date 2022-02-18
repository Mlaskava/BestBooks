const express = require('express');
const {checkLogInOutButtonOptions} = require("./login");
const connection = require("../config/dataBase");
const {sendCategoriesAndProducts} = require("../config/httpHelper");
const router = express.Router();

router.get('/', function (req, res, next) {
    const productsSQL = `SELECT * FROM products;`
    const options = checkLogInOutButtonOptions(req);
    sendCategoriesAndProducts('index', options, res, productsSQL)

});

module.exports = router;
