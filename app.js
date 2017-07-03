var express                 = require("express"),
    bodyParser              = require("body-parser"),
    compression             = require('compression'),
    session                 = require('express-session'),
    methodOverride          = require('method-override'),
    morgan                  = require('morgan'),
    mongoose                = require('mongoose'),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    User                    = require('./models/user'),
    flash                   = require('express-flash'),
    helmet                  = require('helmet'),
    dotenv                  = require('dotenv'),
    sslRedirect             = require('heroku-ssl-redirect'),
    cookieParser            = require('cookie-parser'),
    app                     = express();

// Load environment variables from .env file
dotenv.load();

app.use(compression(9));

app.use(helmet());

app.use(sslRedirect(['production']));

app.use(morgan('tiny'));

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASEURL);

var expiryDate = new Date(Date.now() + 2 * 30 * 24 * 60 * 60 * 1000); // 2 month

app.use(session({
    secret: process.env.SESSION_SECRET,
    name: 'yummySession',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        expires: expiryDate,
    }
}));

app.use(cookieParser());

// Configure to use flash
app.use(flash());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// Passport configuration
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
app.locals.rmWhitespace = true;

app.use(methodOverride("_method"));

//Configure to use body-parser
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", recipeRoutes);
app.use("/profile", userRoutes);
app.use("/auth", authRoutes);


// Production error handler
/* istanbul ignore next */ 
// if (app.get('env') === 'production') {
//   app.use(function(err, req, res, next) {
//     console.error(err.stack);
//     res.sendStatus(err.status || 500);
//   });
// }

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("=========================");
    console.log("Yummy.li Server has started!");
    console.log("=========================");
});

module.exports = app;  // for testing