
var express = require('express');
var db = require('../models');
var router = express.Router();

var passport = require('../config/passport');


router.get('/', function (req, res) {
    console.log(" =user2.id");

});

router.post("/", passport.authenticate('signup'
        , {successRedirect: '/login.html',
            failureRedirect: '/index.html'}
));


router.post("/login", passport.authenticate('login'
        , {successRedirect: '/profile.html',
            failureRedirect: '/index.html'}
));

router.post("/logout", function (req, res) {

    console.log("5-cookie authToken= ");
    req.logout();
    res.redirect('/');
    console.log("logOut");

});

module.exports = router;


