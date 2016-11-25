var express                 = require("express");
var router                  = express.Router();
var passport                = require("passport");
var multer                  = require('multer');
var User                    = require('../models/user');

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var upload = multer({ storage : storage}).single('image');


//NEW - show form to register new user
router.get("/signup", function(req, res){
    res.render("users/signup");
});

//CREATE - register new user
router.post("/signup", function(req, res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file." + err);
        }
        var img = '/uploads/' + req.file.filename;
        var newUser = new User({
            username: req.body.username,
            name: req.body.name,
            image: img
        });
        User.register(newUser, req.body.password, function(err, user){
            if(err){
                console.log(err);
                return res.render("users/signup");
            } else {
                passport.authenticate("local")(req, res, function(){
                    res.redirect("/"); 
                });
            }
        });
    });
});

//SHOW - Login form
router.get("/login", function(req, res){
    res.render("users/login");    
});

//LOGIN to system - middleware
router.post("/login", passport.authenticate("local", {
       successRedirect: "/",
       failureRedirect: "/login"
    }), function(req, res){
});

//LOGOUT
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

module.exports = router;