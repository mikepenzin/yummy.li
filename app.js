var express                 = require("express"),
    bodyParser              = require("body-parser"),
    compression             = require('compression'),
    methodOverride          = require('method-override'),
    mongoose                = require('mongoose'),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    User                    = require('./models/user'),
    flash                   = require('express-flash'),
    app                     = express();

app.use(compression(9));

// console.log("Current runnig database: " + process.env.DATABASEURL);
// If process.env.DATABASEURL = undefined - need to perform:
// export DATABASEURL=mongodb://localhost/yummydb
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASEURL || "mongodb://localhost/yummydb");

//=========================
// Passport configuration
//=========================

app.use(require("express-session")({
    secret: "We made it!",
    resave: false,
    saveUninitialized: false
}));

// Configure to use flash
app.use(flash());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

// Requring routes
var recipeRoutes    = require("./routes/recipes"),
    userRoutes      = require("./routes/users"),
    authRoutes      = require("./routes/auth");

// Configure public folder for static files
app.use(express.static(__dirname + "/public", { maxAge: 8640000000 }));

// Configure view engine
app.set("view engine","ejs");

app.use(methodOverride("_method"));

app.use(require("express-session")({
    secret: "We made it!",
    resave: false,
    saveUninitialized: false
}));


//Configure to use body-parser
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", recipeRoutes);
app.use("/profile", userRoutes);
app.use("/auth", authRoutes);

//SHOW - Team page
app.get("/team", function(req, res){
    res.render("general/team");
});

//SHOW - If unknown page
app.get("*", function(req, res){
    res.redirect("back");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("=========================");
    console.log("Yummy.li Server has started!");
    console.log("=========================");
});


module.exports = app;  // for testing