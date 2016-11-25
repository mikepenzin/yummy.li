var bodyParser              = require("body-parser"),
    compression             = require('compression'),
    express                 = require("express"),
    methodOverride          = require('method-override'),
    mongoose                = require('mongoose'),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    User                    = require('./models/user'),
    app                     = express();

app.use(compression(9));

console.log("Current runnig database: " + process.env.DATABASEURL);
// If process.env.DATABASEURL = undefined - need to perform:
// export DATABASEURL=mongodb://localhost/yummydb
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASEURL);

//=========================
// Passport configuration
//=========================

app.use(require("express-session")({
    secret: "We made it!",
    resave: false,
    saveUninitialized: false
}));

//for Passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

//=========================
// END - Passport configuration
//=========================

//requring routes
var recipeRoutes    = require("./routes/recipes"),
    userRoutes      = require("./routes/users"),
    authRoutes      = require("./routes/auth");

app.use(express.static(__dirname + "/public", { maxAge: 8640000000 }));

// to not use .ejs ending
app.set("view engine","ejs");

app.use(methodOverride("_method"));

app.use(require("express-session")({
    secret: "We made it!",
    resave: false,
    saveUninitialized: false
}));

//tell express to use body-parser
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", recipeRoutes);
app.use("/profile", userRoutes);
app.use("/auth", authRoutes);

//General Routes
app.get("/team", function(req, res){
    res.render("general/team");
});

app.get("*", function(req, res){
    res.redirect("back");
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("=========================");
    console.log("Yummy.li Server has started!");
    console.log("=========================");
});