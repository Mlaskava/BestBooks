require('passport');
const LocalStrategy = require('passport-local').Strategy;
require('./dataBase');
const bcrypt = require('bcrypt')
const connection = require('../config/dataBase')

function initialize(passport) {

    const authenticateUser = (email, password, done) => {
        const sql = `SELECT * FROM users WHERE email='${email}'`
        connection.query(sql, async function (err, result) {
            const user = result[0];
            if (!user) {

                return done(null, false, {message: "No user found"});
            }
            try {
                if (await bcrypt.compare(password, user.password)) {
                    return done(null, user)
                } else {
                    return done(null, false, {message: "Wrong username or password!"})
                }
            } catch (e) {
                return done(e);
            }
        });
    }
    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        const sql = `SELECT * FROM users WHERE id='${id}'`
        connection.query(sql, function (err, result) {
            const user = result[0]
            done(null, user)
        });
    });
}

module.exports = initialize