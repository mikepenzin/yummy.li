var mongoose                = require('mongoose'),
    passportLocalMongoose   = require("passport-local-mongoose");
    
var UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
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
    resetPasswordToken: String,
    resetPasswordExpires: Date    
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);