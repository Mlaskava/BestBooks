const connection = require("./dataBase");

function sendCategoriesAndProducts(view, options, res, productsSQL) {
    const categoriesSQL = `SELECT * FROM categories;`
    connection.query(categoriesSQL, (err, result) => {
        if (err) {
            throw err;
        }
        options.categories = result;
        connection.query(productsSQL, (err, result) => {
            if (err) {
                throw err;
            }
            options.products = result;
            res.render(view, options);
        })
    })
}

function sendProduct(view, options, res, id) {
    res.render(view, options);
}

module.exports = {
    sendCategoriesAndProducts,
    sendProduct
}