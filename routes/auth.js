var express                 = require("express");
var router                  = express.Router();
var passport                = require("passport");
var nodemailer              = require('nodemailer');
var sgTransport             = require('nodemailer-sendgrid-transport');
var async                   = require('async');
var crypto                  = require('crypto');
var User                    = require('../models/user');

// Configuring - nodemailer mail sending through SendGrid
var options = {
    auth: {
        api_user: process.env.SENDGRID_USERNAME,
        api_key: process.env.SENDGRID_PASSWORD
    }
};
    
var mailer = nodemailer.createTransport(sgTransport(options));


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
    html: "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'><html xmlns='http://www.w3.org/1999/xhtml'><head><meta http-equiv='Content-Type' content='text/html; charset=UTF-8'><meta name='viewport' content='initial-scale=1.0'><meta name='format-detection' content='telephone=no'><title>yummy.li // Monthly Update</title><style type='text/css'>.socialLinks {font-size: 6px;}.socialLinks a {display: inline-block;}.socialIcon {display: inline-block;vertical-align: top;padding-bottom: 0px;border-radius: 100%;}table.vb-row.halfpad {border-spacing: 0;padding-left: 9px;padding-right: 9px;}table.vb-row.fullwidth {border-spacing: 0;padding: 0;}table.vb-container.fullwidth {padding-left: 0;padding-right: 0;}</style><style type='text/css'>.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div{ line-height: 100%; }.yshortcuts a{ border-bottom: none !important; }.vb-outer{ min-width: 0 !important; }.RMsgBdy, .ExternalClass{width: 100%;background-color: #3f3f3f;background-color: #3f3f3f}table{ mso-table-rspace: 0pt; mso-table-lspace: 0pt; }#outlook a{ padding: 0; }img{ outline: none; text-decoration: none; border: none; -ms-interpolation-mode: bicubic; }a img{ border: none; }@media screen and (max-device-width: 600px), screen and (max-width: 600px) {table.vb-container, table.vb-row{width: 95% !important;}.mobile-hide{ display: none !important; }.mobile-textcenter{ text-align: center !important; }.mobile-full{float: none !important;width: 100% !important;max-width: none !important;padding-right: 0 !important;padding-left: 0 !important;}img.mobile-full{width: 100% !important;max-width: none !important;height: auto !important;}}</style><style type='text/css'>#ko_tripleArticleBlock_5 .links-color a:visited, #ko_tripleArticleBlock_5 .links-color a:hover {color: #3f3f3f;color: #3f3f3f;text-decoration: underline;}#ko_tripleArticleBlock_7 .links-color a:visited, #ko_tripleArticleBlock_7 .links-color a:hover {color: #3f3f3f;color: #3f3f3f;text-decoration: underline;}#ko_textBlock_11 .links-color a:visited, #ko_textBlock_11 .links-color a:hover {color: #3f3f3f;color: #3f3f3f;text-decoration: underline;}#ko_sideArticleBlock_4 .links-color a:visited, #ko_sideArticleBlock_4 .links-color a:hover {color: #3f3f3f;color: #3f3f3f;text-decoration: underline;}#ko_footerBlock_2 .links-color a:visited, #ko_footerBlock_2 .links-color a:hover {color: #ccc;color: #ccc;text-decoration: underline;}</style></head><body bgcolor='#3f3f3f' text='#919191' alink='#cccccc' vlink='#cccccc' style='margin: 0;padding: 0;background-color: #3f3f3f;color: #919191;'><center><table class='vb-outer' width='100%' cellpadding='0' border='0' cellspacing='0' bgcolor='#ffffff' style='background-color: #ffffff;' id='ko_logoBlock_3'><tbody><tr><td class='vb-outer' align='center' valign='top' bgcolor='#ffffff' style='padding-left: 9px;padding-right: 9px;background-color: #fff;'><div class='oldwebkit' style='max-width: 570px;'><table width='570' style='border-collapse: separate;border-spacing: 18px;padding-left: 0;padding-right: 0;width: 100%;max-width: 570px;' border='0' cellpadding='0' cellspacing='18' class='vb-container fullpad'><tbody><tr><td valign='top' align='center'><div class='mobile-full' style='display: inline-block; max-width: 250px; vertical-align: top; width: 100%;'><a target='_new' href='https://yummy.li/img/Logo_yummyli_small.png' style='font-size: 18px; font-family: Verdana, Geneva, sans-serif; color: #ffffff; text-decoration: none;'><img width='250' vspace='0' hspace='0' border='0' alt='' style='border: 0px;display: block;width: 100%;max-width: 250px;' src='https://yummy.li/img/Logo_yummyli_small.png'></a></div></td></tr></tbody></table></div></td></tr></tbody></table><table class='vb-outer' width='100%' cellpadding='0' border='0' cellspacing='0' bgcolor='#ffffff' style='background-color: #ffffff;' id='ko_hrBlock_8'><tbody><tr><td class='vb-outer' align='center' valign='top' bgcolor='#ffffff' style='padding-left: 9px;padding-right: 9px;background-color: #fff;'><div class='oldwebkit' style='max-width: 570px;'><table width='570' border='0' cellpadding='0' cellspacing='9' class='vb-container halfpad' bgcolor='#ffffff' style='border-collapse: separate;border-spacing: 9px;padding-left: 9px;padding-right: 9px;width: 100%;max-width: 570px;background-color: #fff;'><tbody><tr><td valign='top' bgcolor='#ffffff' align='center' style='background-color: #ffffff;'><table width='100%' cellspacing='0' cellpadding='0' border='0' style='width: 100%;'><tbody><tr><td width='100%' height='1' style='font-size: 1px; line-height: 1px; width: 100%; background-color: #3f3f3f;'> </td></tr></tbody></table></td></tr></tbody></table></div></td></tr></tbody></table><table class='vb-outer' width='100%' cellpadding='0' border='0' cellspacing='0' bgcolor='#ffffff' style='background-color: #ffffff;' id='ko_textBlock_11'><tbody><tr><td class='vb-outer' align='center' valign='top' bgcolor='#ffffff' style='padding-left: 9px;padding-right: 9px;background-color: #fff;'><div class='oldwebkit' style='max-width: 570px;'><table width='570' border='0' cellpadding='0' cellspacing='18' class='vb-container fullpad' bgcolor='#ffffff' style='border-collapse: separate;border-spacing: 18px;padding-left: 0;padding-right: 0;width: 100%;max-width: 570px;background-color: #fff;'><tbody><tr><td align='left' class='long-text links-color' style='text-align: left; font-size: 13px; font-family: Verdana, Geneva, sans-serif; color: #3f3f3f;'><p style='margin: 1em 0px;margin-top: 0px;'>Welcome a board, " + req.body.name + " " + req.body.surname + "!<br><br>We excited to welcome you on <a href='https://yummy.li/' style='color: #3f3f3f;text-decoration: underline;'>yummy.li</a>.<br>Discover amazing <a href='https://yummy.li/' style='color: #3f3f3f;text-decoration: underline;'>trending recipes</a> and feel free to add those amazing recipes to <a href='https://yummy.li/' style='color: #3f3f3f;text-decoration: underline;'>your wishlist</a>.<br><br><br></p></td></tr></tbody></table></div></td></tr></tbody></table><table width='100%' cellpadding='0' border='0' cellspacing='0' bgcolor='#3f3f3f' style='background-color: #3f3f3f;' id='ko_footerBlock_2'><tbody><tr><td align='center' valign='top' bgcolor='#3f3f3f' style='background-color: #3f3f3f;'><div class='oldwebkit' style='max-width: 570px;'><table width='570' style='border-collapse: separate;border-spacing: 9px;padding-left: 9px;padding-right: 9px;width: 100%;max-width: 570px;' border='0' cellpadding='0' cellspacing='9' class='vb-container halfpad' align='center'><tbody><tr><td class='long-text links-color' style='text-align: center; font-size: 13px; color: #919191; font-weight: normal; text-align: center; font-family: Verdana, Geneva, sans-serif;'><p style='margin: 1em 0px;margin-bottom: 0px;margin-top: 0px;'>Email sent to <a href='mailto:" + req.body.username + "' style='color: #ccc;text-decoration: underline;'>" + req.body.username + "</a></p></td></tr><tr style='text-align: center;'><td align='center'><span style='text-decoration: none; color: #ffffff; text-align: center; font-size: 13px; font-weight: normal; font-family: Verdana, Geneva, sans-serif;' target='_new'>made with &#x2661; by <a href='https://yummy.li/' style='text-decoration: none; color: #ffffff; text-align: center; font-size: 13px; font-weight: normal; font-family: Verdana, Geneva, sans-serif;' target='_new'>yummy.li</a></span></td></tr></tbody></table></div></td></tr></tbody></table></center></body></html>"
  };
  User.register(newUser, req.body.password, function(err, user){
    /* istanbul ignore if */
    /* istanbul ignore else */
    if(err){
      console.log(err);
      res.render("users/signup");
    } else {
      passport.authenticate("local")(req, res, function(){
        mailer.sendMail(welcomeMail, function(err, res) {
          /* istanbul ignore if */
          if (err) {
            console.log(err);
          } else {
            console.log("Message sent: " + res);
          }
        });
        req.flash("success", "Welcome a board! You just successfully Signed Up! Nice to meet you " + req.body.name + "!");
        res.redirect("/");
      });
    }
  });
});


//SHOW - Login form
router.get("/login", function(req, res){
  req.flash("error", "Invalid username or password.");
  res.render("users/login");    
});


//LOGIN Route
router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash : true
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
      var tokenMail = {
        to: user.username,
        from: 'noreply@yummy.li',
        subject: 'yummy.li // Password Reset',
        html: "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'><html xmlns='http://www.w3.org/1999/xhtml'><head><meta http-equiv='Content-Type' content='text/html; charset=UTF-8'><meta name='viewport' content='initial-scale=1.0'><meta name='format-detection' content='telephone=no'><title>yummy.li // Monthly Update</title><style type='text/css'>.socialLinks {font-size: 6px;}.socialLinks a {display: inline-block;}.socialIcon {display: inline-block;vertical-align: top;padding-bottom: 0px;border-radius: 100%;}table.vb-row.halfpad {border-spacing: 0;padding-left: 9px;padding-right: 9px;}table.vb-row.fullwidth {border-spacing: 0;padding: 0;}table.vb-container.fullwidth {padding-left: 0;padding-right: 0;}</style><style type='text/css'>.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div{ line-height: 100%; }.yshortcuts a{ border-bottom: none !important; }.vb-outer{ min-width: 0 !important; }.RMsgBdy, .ExternalClass{width: 100%;background-color: #3f3f3f;background-color: #3f3f3f}table{ mso-table-rspace: 0pt; mso-table-lspace: 0pt; }#outlook a{ padding: 0; }img{ outline: none; text-decoration: none; border: none; -ms-interpolation-mode: bicubic; }a img{ border: none; }@media screen and (max-device-width: 600px), screen and (max-width: 600px) {table.vb-container, table.vb-row{width: 95% !important;}.mobile-hide{ display: none !important; }.mobile-textcenter{ text-align: center !important; }.mobile-full{float: none !important;width: 100% !important;max-width: none !important;padding-right: 0 !important;padding-left: 0 !important;}img.mobile-full{width: 100% !important;max-width: none !important;height: auto !important;}}</style><style type='text/css'>#ko_tripleArticleBlock_5 .links-color a:visited, #ko_tripleArticleBlock_5 .links-color a:hover {color: #3f3f3f;color: #3f3f3f;text-decoration: underline;}#ko_tripleArticleBlock_7 .links-color a:visited, #ko_tripleArticleBlock_7 .links-color a:hover {color: #3f3f3f;color: #3f3f3f;text-decoration: underline;}#ko_textBlock_11 .links-color a:visited, #ko_textBlock_11 .links-color a:hover {color: #3f3f3f;color: #3f3f3f;text-decoration: underline;}#ko_sideArticleBlock_4 .links-color a:visited, #ko_sideArticleBlock_4 .links-color a:hover {color: #3f3f3f;color: #3f3f3f;text-decoration: underline;}#ko_footerBlock_2 .links-color a:visited, #ko_footerBlock_2 .links-color a:hover {color: #ccc;color: #ccc;text-decoration: underline;}</style></head><body bgcolor='#3f3f3f' text='#919191' alink='#cccccc' vlink='#cccccc' style='margin: 0;padding: 0;background-color: #3f3f3f;color: #919191;'><center><table class='vb-outer' width='100%' cellpadding='0' border='0' cellspacing='0' bgcolor='#ffffff' style='background-color: #ffffff;' id='ko_logoBlock_3'><tbody><tr><td class='vb-outer' align='center' valign='top' bgcolor='#ffffff' style='padding-left: 9px;padding-right: 9px;background-color: #fff;'><div class='oldwebkit' style='max-width: 570px;'><table width='570' style='border-collapse: separate;border-spacing: 18px;padding-left: 0;padding-right: 0;width: 100%;max-width: 570px;' border='0' cellpadding='0' cellspacing='18' class='vb-container fullpad'><tbody><tr><td valign='top' align='center'><div class='mobile-full' style='display: inline-block; max-width: 250px; vertical-align: top; width: 100%;'><a target='_new' href='https://yummy.li/img/Logo_yummyli_small.png' style='font-size: 18px; font-family: Verdana, Geneva, sans-serif; color: #ffffff; text-decoration: none;'><img width='250' vspace='0' hspace='0' border='0' alt='' style='border: 0px;display: block;width: 100%;max-width: 250px;' src='https://yummy.li/img/Logo_yummyli_small.png'></a></div></td></tr></tbody></table></div></td></tr></tbody></table><table class='vb-outer' width='100%' cellpadding='0' border='0' cellspacing='0' bgcolor='#ffffff' style='background-color: #ffffff;' id='ko_hrBlock_8'><tbody><tr><td class='vb-outer' align='center' valign='top' bgcolor='#ffffff' style='padding-left: 9px;padding-right: 9px;background-color: #fff;'><div class='oldwebkit' style='max-width: 570px;'><table width='570' border='0' cellpadding='0' cellspacing='9' class='vb-container halfpad' bgcolor='#ffffff' style='border-collapse: separate;border-spacing: 9px;padding-left: 9px;padding-right: 9px;width: 100%;max-width: 570px;background-color: #fff;'><tbody><tr><td valign='top' bgcolor='#ffffff' align='center' style='background-color: #ffffff;'><table width='100%' cellspacing='0' cellpadding='0' border='0' style='width: 100%;'><tbody><tr><td width='100%' height='1' style='font-size: 1px; line-height: 1px; width: 100%; background-color: #3f3f3f;'> </td></tr></tbody></table></td></tr></tbody></table></div></td></tr></tbody></table><table class='vb-outer' width='100%' cellpadding='0' border='0' cellspacing='0' bgcolor='#ffffff' style='background-color: #ffffff;' id='ko_textBlock_11'><tbody><tr><td class='vb-outer' align='center' valign='top' bgcolor='#ffffff' style='padding-left: 9px;padding-right: 9px;background-color: #fff;'><div class='oldwebkit' style='max-width: 570px;'><table width='570' border='0' cellpadding='0' cellspacing='18' class='vb-container fullpad' bgcolor='#ffffff' style='border-collapse: separate;border-spacing: 18px;padding-left: 0;padding-right: 0;width: 100%;max-width: 570px;background-color: #fff;'><tbody><tr><td align='left' class='long-text links-color' style='text-align: left; font-size: 13px; font-family: Verdana, Geneva, sans-serif; color: #3f3f3f;'><p style='margin: 1em 0px;margin-top: 0px;'>Hi " + user.name + ",<br><br>You're receiving this because you (or someone else) have requested the reset of the password for your account.<br><br>Please click on the following link, or paste this into your browser to complete the process:<br><a href='http://" + req.headers.host + "/auth/reset/" + token + "' style='color: #3f3f3f;text-decoration: underline;'>http://" + req.headers.host + "/auth/reset/" + token + "</a><br><br><b>Please Note:</b> If you did not request this, please ignore this email and your password will remain unchanged.<br><br><br><br></p></td></tr></tbody></table></div></td></tr></tbody></table><table width='100%' cellpadding='0' border='0' cellspacing='0' bgcolor='#3f3f3f' style='background-color: #3f3f3f;' id='ko_footerBlock_2'><tbody><tr><td align='center' valign='top' bgcolor='#3f3f3f' style='background-color: #3f3f3f;'><div class='oldwebkit' style='max-width: 570px;'><table width='570' style='border-collapse: separate;border-spacing: 9px;padding-left: 9px;padding-right: 9px;width: 100%;max-width: 570px;' border='0' cellpadding='0' cellspacing='9' class='vb-container halfpad' align='center'><tbody><tr><td class='long-text links-color' style='text-align: center; font-size: 13px; color: #919191; font-weight: normal; text-align: center; font-family: Verdana, Geneva, sans-serif;'><p style='margin: 1em 0px;margin-bottom: 0px;margin-top: 0px;'>Email sent to <a href='mailto:" + user.username + "' style='color: #ccc;text-decoration: underline;'>" + user.username + "</a></p></td></tr><tr style='text-align: center;'><td align='center'><span style='text-decoration: none; color: #ffffff; text-align: center; font-size: 13px; font-weight: normal; font-family: Verdana, Geneva, sans-serif;' target='_new'>made with &#x2661; by <a href='https://yummy.li/' style='text-decoration: none; color: #ffffff; text-align: center; font-size: 13px; font-weight: normal; font-family: Verdana, Geneva, sans-serif;' target='_new'>yummy.li</a></span></td></tr></tbody></table></div></td></tr></tbody></table></center></body></html>"
      };
      console.log("Message sent to: " + user.username);
      mailer.sendMail(tokenMail, function(err, res) {
        if (err) { 
          console.log(err);
        }
        console.log(res);
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
    req.flash("success", "Reset message was successfully sent to " + username + "!");
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
        var changeMail = {
          to: user.username,
          from: 'passwordreset@yummy.li',
          subject: 'yummy.li // Your password has been changed',
          html: "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'><html xmlns='http://www.w3.org/1999/xhtml'><head><meta http-equiv='Content-Type' content='text/html; charset=UTF-8'><meta name='viewport' content='initial-scale=1.0'><meta name='format-detection' content='telephone=no'><title>yummy.li // Monthly Update</title><style type='text/css'>.socialLinks {font-size: 6px;}.socialLinks a {display: inline-block;}.socialIcon {display: inline-block;vertical-align: top;padding-bottom: 0px;border-radius: 100%;}table.vb-row.halfpad {border-spacing: 0;padding-left: 9px;padding-right: 9px;}table.vb-row.fullwidth {border-spacing: 0;padding: 0;}table.vb-container.fullwidth {padding-left: 0;padding-right: 0;}</style><style type='text/css'>.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div{ line-height: 100%; }.yshortcuts a{ border-bottom: none !important; }.vb-outer{ min-width: 0 !important; }.RMsgBdy, .ExternalClass{width: 100%;background-color: #3f3f3f;background-color: #3f3f3f}table{ mso-table-rspace: 0pt; mso-table-lspace: 0pt; }#outlook a{ padding: 0; }img{ outline: none; text-decoration: none; border: none; -ms-interpolation-mode: bicubic; }a img{ border: none; }@media screen and (max-device-width: 600px), screen and (max-width: 600px) {table.vb-container, table.vb-row{width: 95% !important;}.mobile-hide{ display: none !important; }.mobile-textcenter{ text-align: center !important; }.mobile-full{float: none !important;width: 100% !important;max-width: none !important;padding-right: 0 !important;padding-left: 0 !important;}img.mobile-full{width: 100% !important;max-width: none !important;height: auto !important;}}</style><style type='text/css'>#ko_tripleArticleBlock_5 .links-color a:visited, #ko_tripleArticleBlock_5 .links-color a:hover {color: #3f3f3f;color: #3f3f3f;text-decoration: underline;}#ko_tripleArticleBlock_7 .links-color a:visited, #ko_tripleArticleBlock_7 .links-color a:hover {color: #3f3f3f;color: #3f3f3f;text-decoration: underline;}#ko_textBlock_11 .links-color a:visited, #ko_textBlock_11 .links-color a:hover {color: #3f3f3f;color: #3f3f3f;text-decoration: underline;}#ko_sideArticleBlock_4 .links-color a:visited, #ko_sideArticleBlock_4 .links-color a:hover {color: #3f3f3f;color: #3f3f3f;text-decoration: underline;}#ko_footerBlock_2 .links-color a:visited, #ko_footerBlock_2 .links-color a:hover {color: #ccc;color: #ccc;text-decoration: underline;}</style></head><body bgcolor='#3f3f3f' text='#919191' alink='#cccccc' vlink='#cccccc' style='margin: 0;padding: 0;background-color: #3f3f3f;color: #919191;'><center><table class='vb-outer' width='100%' cellpadding='0' border='0' cellspacing='0' bgcolor='#ffffff' style='background-color: #ffffff;' id='ko_logoBlock_3'><tbody><tr><td class='vb-outer' align='center' valign='top' bgcolor='#ffffff' style='padding-left: 9px;padding-right: 9px;background-color: #fff;'><div class='oldwebkit' style='max-width: 570px;'><table width='570' style='border-collapse: separate;border-spacing: 18px;padding-left: 0;padding-right: 0;width: 100%;max-width: 570px;' border='0' cellpadding='0' cellspacing='18' class='vb-container fullpad'><tbody><tr><td valign='top' align='center'><div class='mobile-full' style='display: inline-block; max-width: 250px; vertical-align: top; width: 100%;'><a target='_new' href='https://yummy.li/img/Logo_yummyli_small.png' style='font-size: 18px; font-family: Verdana, Geneva, sans-serif; color: #ffffff; text-decoration: none;'><img width='250' vspace='0' hspace='0' border='0' alt='' style='border: 0px;display: block;width: 100%;max-width: 250px;' src='https://yummy.li/img/Logo_yummyli_small.png'></a></div></td></tr></tbody></table></div></td></tr></tbody></table><table class='vb-outer' width='100%' cellpadding='0' border='0' cellspacing='0' bgcolor='#ffffff' style='background-color: #ffffff;' id='ko_hrBlock_8'><tbody><tr><td class='vb-outer' align='center' valign='top' bgcolor='#ffffff' style='padding-left: 9px;padding-right: 9px;background-color: #fff;'><div class='oldwebkit' style='max-width: 570px;'><table width='570' border='0' cellpadding='0' cellspacing='9' class='vb-container halfpad' bgcolor='#ffffff' style='border-collapse: separate;border-spacing: 9px;padding-left: 9px;padding-right: 9px;width: 100%;max-width: 570px;background-color: #fff;'><tbody><tr><td valign='top' bgcolor='#ffffff' align='center' style='background-color: #ffffff;'><table width='100%' cellspacing='0' cellpadding='0' border='0' style='width: 100%;'><tbody><tr><td width='100%' height='1' style='font-size: 1px; line-height: 1px; width: 100%; background-color: #3f3f3f;'> </td></tr></tbody></table></td></tr></tbody></table></div></td></tr></tbody></table><table class='vb-outer' width='100%' cellpadding='0' border='0' cellspacing='0' bgcolor='#ffffff' style='background-color: #ffffff;' id='ko_textBlock_11'><tbody><tr><td class='vb-outer' align='center' valign='top' bgcolor='#ffffff' style='padding-left: 9px;padding-right: 9px;background-color: #fff;'><div class='oldwebkit' style='max-width: 570px;'><table width='570' border='0' cellpadding='0' cellspacing='18' class='vb-container fullpad' bgcolor='#ffffff' style='border-collapse: separate;border-spacing: 18px;padding-left: 0;padding-right: 0;width: 100%;max-width: 570px;background-color: #fff;'><tbody><tr><td align='left' class='long-text links-color' style='text-align: left; font-size: 13px; font-family: Verdana, Geneva, sans-serif; color: #3f3f3f;'><p style='margin: 1em 0px;margin-top: 0px;'>Hi " + user.name + ",<br><br>This is a confirmation that the password for your account has just been changed.<br><br><br><br></p></td></tr></tbody></table></div></td></tr></tbody></table><table width='100%' cellpadding='0' border='0' cellspacing='0' bgcolor='#3f3f3f' style='background-color: #3f3f3f;' id='ko_footerBlock_2'><tbody><tr><td align='center' valign='top' bgcolor='#3f3f3f' style='background-color: #3f3f3f;'><div class='oldwebkit' style='max-width: 570px;'><table width='570' style='border-collapse: separate;border-spacing: 9px;padding-left: 9px;padding-right: 9px;width: 100%;max-width: 570px;' border='0' cellpadding='0' cellspacing='9' class='vb-container halfpad' align='center'><tbody><tr><td class='long-text links-color' style='text-align: center; font-size: 13px; color: #919191; font-weight: normal; text-align: center; font-family: Verdana, Geneva, sans-serif;'><p style='margin: 1em 0px;margin-bottom: 0px;margin-top: 0px;'>Email sent to <a href='mailto:" + user.username + "' style='color: #ccc;text-decoration: underline;'>" + user.username + "</a></p></td></tr><tr style='text-align: center;'><td align='center'><span style='text-decoration: none; color: #ffffff; text-align: center; font-size: 13px; font-weight: normal; font-family: Verdana, Geneva, sans-serif;' target='_new'>made with &#x2661; by <a href='https://yummy.li/' style='text-decoration: none; color: #ffffff; text-align: center; font-size: 13px; font-weight: normal; font-family: Verdana, Geneva, sans-serif;' target='_new'>yummy.li</a></span></td></tr></tbody></table></div></td></tr></tbody></table></center></body></html>"
        };
          mailer.sendMail(changeMail, function(err, res) {
            /* istanbul ignore if */
            if (err) {
              console.log(err);
            } else {
              console.log("Message sent to: " + user.username);
            }
          });
        res.redirect('/auth/login');   
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