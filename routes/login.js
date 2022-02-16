const express = require('express');
const passport = require("passport");
const router = express.Router();

router.get('/', function (req, res, next) {
    const options = checkLogInOutButtonOptions(req);
    res.render('login', options);
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
}));

router.delete('/', function (req, res) {
    req.logOut();
    res.redirect('/');
})

function checkLogInOutButtonOptions(req) {
    if (req.isAuthenticated()) {
        return {actionType: "logout()", buttonName: "Wyloguj"};
    } else {
        return {actionType: "redirectToLogin()", buttonName: "Zaloguj"};
    }
}

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}


module.exports = {
    router,
    checkAuthenticated,
    checkNotAuthenticated,
    checkLogInOutButtonOptions
}