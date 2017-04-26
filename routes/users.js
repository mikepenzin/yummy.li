var express     = require("express");
var router      = express.Router();
var multer      = require('multer');
var Filepicker  = require('node-filepicker');
var fs          = require('fs');
var User        = require('../models/user');
var middleware  = require('../middleware');

var filepicker = new Filepicker('API_KEY');

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var upload = multer({ storage : storage}).single('image');

router.get("/:user_id", middleware.isLoggedIn, function(req, res){
    User.find(req.params.user_id, function(err, foundUser){
        if (err) {
            console.log(err);    
        } else {
            res.render("users/profile", {user:foundUser});
        }
    });
});

//SHOW - whishlist
router.get("/:user_id/wishlist", middleware.isLoggedIn, function(req, res){
    User.find(req.params.user_id, function(err, foundUser){
        if (err) {
            console.log(err);    
        } else {
            res.render("users/wishlist", {user:foundUser});
        }
    });
});

///
router.get("/:user_id/update", middleware.isLoggedIn, function(req, res){
    User.find(req.params.user_id, function(err, foundUser){
        if (err) {
            console.log(err);    
        } else {
            res.render("users/edit", {user:foundUser});
        }
    });
});

//Update - user profile
router.put("/:user_id/new", middleware.isLoggedIn, function(req, res){
    //get data from form
    var name = req.body.name;
    var surname = req.body.surname;
    var location = req.body.location;
    var bio = req.body.bio;
    
    var newUserInfo = {
        name: name, 
        surname: surname,
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

// Update profile picture
router.get("/:user_id/profilePicture", middleware.isLoggedIn, function(req, res){
    User.find(req.params.user_id, function(err, foundUser){
        if (err) {
            console.log(err);    
        } else {
            res.render("users/pictureUpload", {user:foundUser});
        }
    });
});

//Update - user profile picture
router.put("/:user_id/profilePicture", middleware.isLoggedIn, function(req, res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file." + err);
        }
    //get data from form and add to campgrounds array
    var image = '/uploads/' + req.file.filename;
    
    var newUserInfo = {
        image: image
    };
    User.findById(req.params.user_id, function(err, user){
       if(err) {
           console.log(err);
       } else {
            var path = "./public" + user.image;   
            User.findByIdAndUpdate(req.params.user_id, newUserInfo, function(err, updatedUser){
                if(err){
                  console.log(err);
                  res.redirect("back");
                } else {
                    if( user.image !== undefined ) {
                        fs.unlink(path , function(err){
                            if(err) {
                                console.log(err);
                            }    
                        });
                    }
                    res.redirect("/profile/" + req.params.user_id);
                }
            });
       }
    });
    });
});

module.exports = router;