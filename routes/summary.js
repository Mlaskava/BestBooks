const express = require('express');
const router = express.Router();
const {checkLogInOutButtonOptions} = require("./login");
const connection = require("../config/dataBase");

router.get('/', (req, res, next) => {
    const countSQL = `SELECT SUM(amount) AS count FROM cart WHERE id='${req.user.id}';`;
    connection.query(countSQL, (err, result) => {
        if (err) {
            throw err;
        }
        const options = checkLogInOutButtonOptions(req);
        options.count = result[0].count !== null ? result[0].count : 0;
        res.render('summary', options);
        const deleteSQL = `DELETE FROM cart WHERE id='${req.user.id}';`;
        connection.query(deleteSQL, (err) => {
            if (err) {
                throw err;
            }
        });
    });

})

module.exports = router;