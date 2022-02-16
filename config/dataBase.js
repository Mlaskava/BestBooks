const mysql = require('mysql');

const dataBase = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "storedb"
});

dataBase.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = dataBase;