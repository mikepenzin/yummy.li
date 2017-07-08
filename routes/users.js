var express     = require("express");
var router      = express.Router();
var mongoose    = require('mongoose');
var User        = require('../models/user');
var middleware  = require('../middleware');

/* istanbul ignore next */ 
//SHOW - User's Profile page
router.get("/:user_id", middleware.isLoggedIn, function(req, res){
    
    var userID = mongoose.Types.ObjectId(req.params.user_id);
    User.findById(userID, function(err, foundUser){
        /* istanbul ignore if */
        if (err) {
            console.log(err);    
        } else {
            res.render("users/profile", {user:foundUser});
        }
    });
    
});

/* istanbul ignore next */ 
//SHOW - User's Whishlist
router.get("/:user_id/wishlist", middleware.isLoggedIn, function(req, res){
    
    var userID = mongoose.Types.ObjectId(req.params.user_id);
    User.findById(userID, function(err, foundUser){
        /* istanbul ignore if */
        if (err) {
            console.log(err);    
        } else {
            res.render("users/wishlist", {user:foundUser});
        }
    });
    
});

/* istanbul ignore next */ 
// SHOW - User's profile update
router.get("/:user_id/update", middleware.isLoggedIn, function(req, res){
    
    var userID = mongoose.Types.ObjectId(req.params.user_id);
    User.findById(userID, function(err, foundUser){
        /* istanbul ignore if */
        if (err) {
            console.log(err);    
        } else {
            res.render("users/edit", {user:foundUser});
        }
    });
    
});

/* istanbul ignore next */ 
//UPDATE - User Profile
router.put("/:user_id/update", middleware.isLoggedIn, function(req, res){
    
    var favs = req.body.favs;
        favs = favs.split(", ");
        
    var newUserInfo = {
        name: req.body.name, 
        surname: req.body.surname,
        location: req.body.location, 
        bio: req.body.bio,
        favFood: favs
    };
    
    User.findByIdAndUpdate(req.params.user_id, newUserInfo, function(err, updatedUser){
        /* istanbul ignore if */
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            req.flash('success', 'Profile was updated successfully!');
            res.redirect("/profile/" + req.params.user_id);
        }
    });
    
});

/* istanbul ignore next */ 
//UPDATE - User's Profile Picture
router.put("/:user_id/profilePicture", middleware.isLoggedIn, function(req, res){
    User.findByIdAndUpdate(req.params.user_id, { image: req.body.image }, function(err, updatedUser){
        /* istanbul ignore if */
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            req.flash('success', 'User picture was updated successfully!');
            res.redirect("/profile/" + req.params.user_id);
        }
    });
});

module.exports = router;