var bodyParser              = require("body-parser"),
    compression             = require('compression'),
    express                 = require("express"),
    unirest                 = require("unirest"),
    request                 = require("request"),
    app                     = express();

app.use(compression(9));

//requring routes
var recipeRoutes    = require("./routes/recipes"),
    userRoutes      = require("./routes/users");

app.use(express.static(__dirname + "/public", { maxAge: 8640000000 }));

// to not use .ejs ending
app.set("view engine","ejs");

//tell express to use body-parser
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", recipeRoutes);
app.use("/profile", userRoutes);

//General Routes
app.get("/team", function(req, res){
    res.render("general/team")
});

app.get("*", function(req, res){
    res.redirect("back");
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("=========================");
    console.log("Yummy.li Server has started!");
    console.log("=========================");
});