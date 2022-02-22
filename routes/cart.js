const express = require('express');
const {checkLogInOutButtonOptions} = require("./login");
const router = express.Router();
const checkAuthenticated = require('./login').checkAuthenticated;
const connection = require("../config/dataBase");

router.get('/', checkAuthenticated, (req, res, next) => {
    const options = checkLogInOutButtonOptions(req);
    const sql = `SELECT * FROM cart NATURAL JOIN products WHERE id=${req.user.id};`
    connection.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        options.products = result;
        res.render('cart', options);
    })

});

router.post('/', (req, res, next) => {
    if (req.isAuthenticated()) {
        const selectSQL = `SELECT * FROM cart NATURAL JOIN products WHERE id=${req.user.id};`
        connection.query(selectSQL, (err, result) => {
            if (req.query.method === "append") {
                if (result.length === 0 || Number(req.body.amount) + Number(result[0].amount) <= Number(result[0].available_amount)) {
                    const insertSQL = `INSERT INTO cart (id, product_id, amount) VALUES ('${req.user.id}', '${req.body.product_id}', '${req.body.amount}') ON DUPLICATE KEY UPDATE amount=amount + '${req.body.amount}';`;
                    connection.query(insertSQL, (err) => {
                        if (err) {
                            throw err;
                        }
                        res.send({message: `Pomyślnie dodano ${req.body.amount} produktów do koszyka!`});
                    });
                } else {
                    res.send({message: "Brak wystarczającej ilości produktów na stanie!"});

                }
            } else if (req.query.method === "set") {
                if (result.length === 0 || Number(req.body.amount) <= Number(result[0].available_amount)) {
                    const insertSQL = `UPDATE cart SET amount='${req.body.amount}' WHERE id='${req.user.id}' AND product_id='${req.body.product_id}'`;
                    connection.query(insertSQL, (err, aaaa) => {
                        if (err) {
                            throw err;
                        }
                        res.send({message: "", value: req.body.amount, prize: req.body.amount * result[0].prize});
                    });
                } else {
                    const insertSQL = `UPDATE cart SET amount='${result[0].available_amount}' WHERE id='${req.user.id}' AND product_id='${req.body.product_id}'`;
                    connection.query(insertSQL, (err) => {
                        if (err) {
                            throw err;
                        }
                    });
                    res.send({
                        message: "Brak wystarczającej ilości produktów na stanie!",
                        value: result[0].available_amount,
                        prize: result[0].available_amount * result[0].prize
                    });
                }
            }

        })
    } else {
        res.send("Musisz być zalogowany, żeby dodawać przedmioty do koszyka!");
    }
});

router.delete('/', (req, res) => {
    let sql
    if (req.query.entries === "ALL") {
        res.redirect('summary');
        }
    else {
        sql = `DELETE FROM cart WHERE id='${req.user.id}' AND product_id='${req.query.entries}';`
        connection.query(sql, (err) => {
            res.redirect('');
        });
    }


        })
//@TODO usuwanie kupionej ilości książek z bazy
module.exports = router;