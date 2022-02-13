const express = require('express');
const passport = require("passport");
const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
}));

router.delete('/', function (req, res){
    req.logOut();
    res.redirect('/');
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
 if(req.isAuthenticated()) {
     return res.redirect('/')
 }
 next()
}


module.exports = {
    router,
    checkAuthenticated,
    checkNotAuthenticated
}