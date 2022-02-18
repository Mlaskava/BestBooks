const express = require('express');
const router = express.Router();
const {checkLogInOutButtonOptions} = require("./login");
const {sendCategoriesAndProducts} = require("../config/httpHelper");

router.get('/', (req, res, next) => {
    const options = checkLogInOutButtonOptions(req);
    options.name = req.query.name !== "%" ? req.query.name : "";
    console.log(options.name)
    const productsSQL = `SELECT * FROM products WHERE category_id LIKE '${req.query.category}' AND name LIKE '%${options.name}%';`
    sendCategoriesAndProducts('results', options, res, productsSQL);
})

module.exports = router;