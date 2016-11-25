var express     = require("express");
var router      = express.Router();
var User        = require('../models/user');
var middleware  = require('../middleware');


router.get("/:user_id", middleware.isLoggedIn, function(req, res){
    User.find(req.params.user_id, function(err, foundUser){
        if (err) {
            console.log(err);    
        } else {
            res.render("users/profile", {user:foundUser});
        }
    });
});

router.get("/:user_id/wishlist", middleware.isLoggedIn, function(req, res){
    User.find(req.params.user_id, function(err, foundUser){
        if (err) {
            console.log(err);    
        } else {
            res.render("users/wishlist", {user:foundUser});
        }
    });
});

router.get("/:user_id/update", middleware.isLoggedIn, function(req, res){
    User.find(req.params.user_id, function(err, foundUser){
        if (err) {
            console.log(err);    
        } else {
            res.render("user/edit", {user:foundUser});
        }
    });
});

router.put("/:user_id/new", middleware.isLoggedIn, function(req, res){
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var location = req.body.location;
    var bio = req.body.bio;
    
    var newUserInfo = {
        firstName: firstName, 
        lastName: lastName, 
        email: email, 
        location: location, 
        bio: bio
    };
    User.findByIdAndUpdate(req.params.user_id, newUserInfo, function(err, updatedUser){
        if(err){
          console.log(err);
          res.redirect("back");
        } else {
          res.redirect("/profile/" + req.params.user_id);
        }
        });
});

//UPDATE
router.put("/:user_id/old", middleware.isLoggedIn, function(req, res){
  User.findByIdAndUpdate(req.params.user_id, req.body.user, function(err, updatedUser){
    if(err){
      console.log(err);
      res.redirect("back");
    } else {
      res.redirect("/profile/" + req.params.user_id);
    }
  });
});

module.exports = router;