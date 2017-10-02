var mongoose                = require('mongoose'),
    passportLocalMongoose   = require("passport-local-mongoose");
    
var UserSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: [true, 'Email is required'],
        unique: true
    },
    password: { 
        type: String
    },
    name: { 
        type: String
    },
    surname: { 
        type: String
    },
    image: { 
        type: String, 
        default: '/img/profile_user.jpg' 
    },
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