
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');


var app = require('../app');
var cookie = require('cookie-parser');
var db = require('../models');
var secret = "testsecret";
var token = 0;

passport.serializeUser(function (user, done) {
    console.log("serializeUser= " + ":id= " + user.authToken);
    //var sessionUser = {id: user.ID, fullname: user.fullname, email: user.email, authToken: user.authToken};
    token = user.authToken;
    //res.cookie('auth', auth);
    done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function (user, done) {
    db.user.find({where: {ID: user.ID}}).then(function (user) {
        if (!user) {
            //console.log("1-deserializeUser-id= " + authToken + ":password= " + user.authToken);
            return done(null, false);
        }
        console.log("2-deserializeUser ");

        return done(null, user);
    }).catch(function (err) {
        console.error(err.stack);
        console.log("3-deserializeUser err authToken= ");
        return done(null, false);
    });
});

/*passport.use(new CookieStrategy(
        function (user, done) {
            db.user.find({token: user.authToken}, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            });
        }
));
*/
passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
},

        function (req, res, email, done) {
            console.log("1-email= " + req.body.email + ":password= " + req.body.password);
            db.user.find({where: {'email': req.body.email, 'password': req.body.password}}).then(function (user)
            {
                if (!user) {
                    console.log("!user= " + req.body.email + ":password= " + req.body.password);
                    return done(null, false, {message: 'Unknown user'});
                } else if (!user.password === req.body.password) {
                    return done(null, false, {message: 'Invalid password'});
                } else {

                    // console.log("4-cookie authToken= " + req.sessionID + " " + req.session.cookie.authToken + ":session authToken= " + session.authToken);
                    console.log("4-sessionID= " + req.sessionID);
                    console.log("4-cookie authToken= " + req.session.cookie.authToken);
                    //res.session.passport.cookie.authToken = user.authToken;

                    //console.log("req.session.passport.user.authTocken" + req.cookie.auth);
                    console.log(req.cookies);
                    console.log("4-session authToken= " + req.session.authToken);
                    console.log("4-cookie authToken= " + req.session.cookie.authToken);
                    //console.log("4-cookie authToken= " + req.sessionID);
                    return done(null, user);
                }

            }
            ).catch(function (err) {
                console.error(err.stack + "err.message");
                console.log(req.cookies);
                console.log("5-err.message = " + err.message + ": password= " + req.body.password);

            });

            console.log(req.cookies);
            //res.cookie(auth, user.authToken, {expires: new Date(Date.now() + 900000), httpOnly: true});

        }));


passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
},
        function (req, res, email, password, done) {

            db.user.find({where: {'email': req.body.email}}).then(function (user)
            {
                if (user) {
                    console.log("!user= " + req.body.email + ":is exist= " + req.body.password);
                    done(null, false);
                } else {

                    var expiresIn = '0';
                    var token = jwt.sign({user: req.body.email}, secret, {expiresIn: expiresIn});

                    console.log("token= " + token);
                    var userInstance = db.user.build({
                        ID: req.body.id,
                        fullName: req.body.fullname,
                        email: req.body.email,
                        password: req.body.password,
                        authToken: token
                    });

                    userInstance.save().then(function (user) {
                        var _userInstance = userInstance.get({plain: true});
                        console.log("inside then" + _userInstance);


                        done(null, user);
                    }).catch(function (err)
                    {
                        console.error(" err=" + err.stack);
                        done(null, false);
                    }
                    );



                }
            }
            ).catch(function (err) {
                //done(null, false, {message: 'Unknown user'});
                //res.json({err});
                console.error(err.message);
                console.log("5-catch err -132");
                done(null, false, err);

            });

            //user.setUser(req, res, id, fullname, email, password, token)
            console.log("user add" + req.body.id + req.body.fullname);

        }));

module.exports = passport;