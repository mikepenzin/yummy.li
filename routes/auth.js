var express                 = require("express");
var router                  = express.Router();
var passport                = require("passport");
var multer                  = require('multer');
var nodemailer              = require('nodemailer');
var sgTransport             = require('nodemailer-sendgrid-transport');
var async                   = require('async');
var crypto                  = require('crypto');
var User                    = require('../models/user');


var smtpTransport = nodemailer.createTransport('SMTP', {
    service: 'SendGrid',
    auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD
      }
});
          
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

//FORGOT

router.get('/forgot', function(req, res){
   res.render("users/forgot"); 
});


router.post('/forgot', function(req, res, next) {
    var username = req.body.username;
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({username: username}, function(err, user) {
        if (!user) {
            console.log(err);
          return res.redirect('users/forgot');
        }
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var mailOptions = {
        to: user.username,
        from: 'passwordreset@yummy.li',
        subject: 'yummy.li // Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/auth/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
        console.log("Message sent to: " + user.username);
      smtpTransport.sendMail(mailOptions, function(err) {
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.render('users/forgot');
  });
});

// RESET GET ROUTE
router.get('/reset/:token', function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgot');
    }
    res.render('users/reset', {
      user: req.user
    });
  });
});

// RESET POST ROUTE
router.post('/reset/:token', function(req, res) {
if(req.body.password !== req.body.confirm) {
  req.flash('error', 'Password and password confirmation fields must be the same');
  return res.redirect('back');
}  
User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if(err){
      console.log(err);
    }
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('back');
    }
    console.log(req.body.password);
    user.setPassword(req.body.password, function(err){
      if(err){
        console.log(err);
      }
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      user.save(function(err) {
          if(err){
            console.log(err);
          }
          var mailOptions = {
            to: user.username,
            from: 'passwordreset@yummy.li',
            subject: 'yummy.li // Your password has been changed',
            text: 'Hello,\n\n' +
              'This is a confirmation that the password for your account has just been changed.\n'
          };
            smtpTransport.sendMail(mailOptions, function(err) {
              console.log("Message sent to: " + user.username);
              res.redirect('/auth/login');
            });
           
          });
    });
  });  
});

//LOGOUT
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

module.exports = router;