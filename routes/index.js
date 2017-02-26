var db = require('../models')
var express = require('express');
var router = express.Router();
//var passport = require('../config/passport');
/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/
router.post('/', function (req, res) {
    db.user.findAll().then(function (user) {
        //var juser = JSON.pares(user);
        //var fullname = (JSON.pares(user)).fullname;
        //var fullname = juser[0];
        res.json(user),
                // JSONArray Array = new JSONArray(user);
                //  res.append(user.id)
                console.log(user + " = user ");
        // console.log("user "+ " " + juser.fullname + " " +" myArray[0].get("fullname")" + " " + "user[0].fullname "+ "  =user.id");
    });
});

module.exports = router;
