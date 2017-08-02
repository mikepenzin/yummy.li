var mongoose = require("mongoose");
var User     = require('../models/user');

var seedDB = {};

seedDB.addImageToUsers = function() {
    User.find( { image: null }, function(err, foundUsers){
        if (err){
            console.lo(err);
        } else {
            foundUsers.forEach(function(user){
                user.image = '/img/profile_user.jpg';
                user.save();
                console.log(user.username + "'s image updated!");
            });
            
        }
    });
};


seedDB.addPromoData = function() {
    User.find( { promo: null }, function(err, foundUsers) {
        if (err){
            console.lo(err);
        } else {
            foundUsers.forEach(function(user){
                user.promo = true;
                user.save();
                console.log(user.username + "'s promo updated to TRUE!");
            });
            
        }
    });    
};

module.exports = seedDB;