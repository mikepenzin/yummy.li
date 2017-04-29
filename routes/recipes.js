var express     = require("express"),
    unirest     = require("unirest"),
    middleware  = require('../middleware'),
    User        = require('../models/user'),
    router      = express.Router();

//Index route - Show search form
router.get("/", function(req, res){
    var title = "yummy.li -  Search recipes using ingredients you already have in the kitchen! What's in your fridge?";
    res.render("general/home", {title: title});
});

// Used Environment variable (process.env.API_URL) for personal API key from Food2Fork

//SHOW - search results for recipes - by ingridients 
router.get("/q", function(req, res){
    var search = req.query.search;
    var page = Number(req.query.page) || 1;
    unirest.get("https://community-food2fork.p.mashape.com/search?key=" + process.env.API_URL + "&page=" + page + "&q=" + search + "&sort=r")
    .header("X-Mashape-Key", "Fj5xGp8OhGmshrg45yEPk5IvGe0xp1DCBIFjsnLHD4OsQxCvPD")
    .header("Accept", "application/json")
    .end(function (result) {
        if (result.statusCode == 200) {
            var data = JSON.parse(result.body);
            data = data.recipes;
                if(data.length !== 0){   
                   //this array is not empty 
                   res.render("recipe/search", {data:data, q:search, page:page});
                } else {
                   //this array is empty
                   res.render("recipe/noresults", {q:search});
                }
          } else {
            console.log("Something whent wrong!");
            console.log(result.status, result.headers);
            res.redirect("back");
          }    
    });
});

//SHOW - Recipe data
router.get("/recipe/:recipe_id", function(req, res){
    var url = "https://community-food2fork.p.mashape.com/get?key=" + process.env.API_URL + "&rId=" + req.params.recipe_id;
    unirest.get(url)
    .header("X-Mashape-Key", "Fj5xGp8OhGmshrg45yEPk5IvGe0xp1DCBIFjsnLHD4OsQxCvPD")
    .header("Accept", "application/json")
    .end(function (result) {
        if (result.statusCode == 200) {
            var data = JSON.parse(result.body);
            data = data.recipe;
            res.render("recipe/show", {recipe:data});
          } else {
            console.log("Something whent wrong!");
            console.log(result.status, result.headers);
            res.redirect("back");
          }    
    });
});

// UPDATE - Add recipe to User's wishlist
router.put("/wishlist/:user_id/:recipe_id",middleware.isLoggedIn, function(req, res){
    var newWishlistItem = {
        id: req.body.id, 
        image_url: req.body.image_url, 
        publisher: req.body.publisher, 
        title: req.body.title
    };
    User.findById(req.params.user_id, function(err, foundUser){
        if(err) {
            console.log(err);
        } else {
            foundUser.recipes.push(newWishlistItem);
            foundUser.save();
            res.redirect("back");
        }
    });
});

//UPDATE - Remove recipe from User's wishlist
router.put("/wishlist/:user_id/:recipe_id/remove",middleware.isLoggedIn, function(req, res){
    var id = req.params.recipe_id;
    User.findById(req.params.user_id, function (err, foundUser) {
        var recipe = foundUser.recipes; 
        if (!err) {
            for (var i = 0; i < recipe.length; i++) {
                if (recipe[i].id == id) {
                    foundUser.recipes[i].remove();
                    foundUser.save(function (err) {
                        if (err){
                            console.log(err);
                        } else {
                            res.redirect("back");
                        }
                    });
                }
            }
        }
    });
});

module.exports = router;