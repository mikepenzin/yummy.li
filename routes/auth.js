var express                 = require("express");
var router                  = express.Router();
var passport                = require("passport");
var nodemailer              = require('nodemailer');
var sgTransport             = require('nodemailer-sendgrid-transport');
var async                   = require('async');
var crypto                  = require('crypto');
var User                    = require('../models/user');

// Configuring - nodemailer mail sending through SendGrid
var smtpTransport = nodemailer.createTransport('SMTP', {
  service: 'SendGrid',
  auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD
  }
});


//NEW - Show form to register new User
router.get("/signup", function(req, res){
  res.render("users/signup");
});


//CREATE - Register new User
router.post("/signup", function(req, res){
  var newUser = new User({
    username: req.body.username,
    name: req.body.name,
    surname: req.body.surname
  });
  var welcomeMail = {
    to: req.body.username,
    from: 'noreply@yummy.li',
    subject: 'yummy.li // Welcome aboard!',
    html: "<img src='https://yummy.li/img/Logo_yummyli_small.png' style='display: block; margin: 0 auto;' />" + 
    "Welcome to yummy.li!" + "<br><br><br><br>" + 
    "Dear " + req.body.name + " " + req.body.surname + ", <br><br>" +
    "We have created an account for you on yummy.li, to login visit https://yummy.li/ <br><br>" +
    "Email: " + req.body.username + "<br><br>" + 
    "Discover trending recipes in: <a href='http://yummy.li/trending'>yummy.li/trending</a>  <br><br><br><br>" +
    "<b>Best Regards, <br><br>" +
    "yummy.li team</b>"
  };
  User.register(newUser, req.body.password, function(err, user){
    /* istanbul ignore if */
    /* istanbul ignore else */
    if(err){
      console.log(err);
      return res.render("users/signup");
    } else {
      passport.authenticate("local")(req, res, function(){
        console.log("Start sending mail");
        smtpTransport.sendMail(welcomeMail, function(err) {
          /* istanbul ignore if */
          if (err) {
            console.log(err);
          } else {
            console.log("Message sent successfully!");
            res.redirect("/");
          }
        });
      });
    }
  });
});


//SHOW - Login form
router.get("/login", function(req, res){
  res.render("users/login");    
});


//LOGIN Route
router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
  }),
  /* istanbul ignore next */ 
  function(req, res){
});


//SHOW - User password reset form
router.get('/forgot', function(req, res){
   res.render("users/forgot"); 
});

/* istanbul ignore next */
//CREATE - Send User's password reset token to user's email
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
            return res.redirect('back');
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
  ], 
  /* istanbul ignore next */
  function(err) {
    /* istanbul ignore if */
    if (err) {
      return next(err);
    }
    res.render('users/forgot');
  });
});

/* istanbul ignore next */
// SHOW - Show new password form
router.get('/reset/:token', function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      if (!user) {
        req.flash('error', 'Password reset token is invalid or has expired.');
        return res.redirect('/forgot');
      }
      res.render('users/reset', { user: req.user });
    }
  });
});

/* istanbul ignore next */ 
// POST - Update User's password
router.post('/reset/:token', function(req, res) {
  if(req.body.password !== req.body.confirm) {
    req.flash('error', 'Password and password confirmation fields must be the same');
    return res.redirect('back');
  }  
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    /* istanbul ignore if */
    if(err){
      console.log(err);
    }
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('back');
    }
    user.setPassword(req.body.password, function(err){
      /* istanbul ignore if */
      if(err){
        console.log(err);
      } else {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        user.save(function(err) {
        /* istanbul ignore if */  
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
            /* istanbul ignore if */
            if (err) {
              console.log(err);
            } else {
              console.log("Message sent to: " + user.username);
              res.redirect('/auth/login'); 
            }
          });
        });  
      }
    });
  });  
});

/* istanbul ignore next */ 
//LOGOUT
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

module.exports = router;