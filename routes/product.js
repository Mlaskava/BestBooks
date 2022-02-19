const express = require('express');
const {checkLogInOutButtonOptions} = require("./login");
const connection = require("../config/dataBase");
const {sendProduct} = require("../config/httpHelper");
const router = express.Router();

router.get('/:id', function (req, res, next) {
    const options = checkLogInOutButtonOptions(req);
    const sql = `SELECT * FROM products WHERE product_id=${req.params.id}`
    connection.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result[0]);
        options.product = result[0];
        sendProduct('product', options, res);
    })
});

module.exports = router;