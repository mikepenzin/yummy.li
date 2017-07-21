var mongoose                = require('mongoose'),
    passportLocalMongoose   = require("passport-local-mongoose");
    
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    surname: String,
    image: String,
    bio: String,
    location: String,
    recipes: [{
        id: String,
        title: String,
        image_url: String,
        publisher: String
        }],
    favFood: [String],    
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    promo: { 
        type: Boolean, 
        default: true
    },
    registrationDate: {
        type: Date, 
        default: Date.now
    },
    latestLogin: { 
        type: Date, 
        default: Date.now 
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);