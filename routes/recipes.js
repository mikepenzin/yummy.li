var express     = require("express"),
    unirest     = require("unirest"),
    middleware  = require('../middleware'),
    User        = require('../models/user'),
    router      = express.Router();


router.get("/", function(req, res){
    res.render("general/home");
});

// Used Environment variable (process.env.API_URL) for personal API key from Food2Fork

//SHOW search results for recipes - by ingridients 
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
            if(data !== undefined || data.length > 0){   
               //this array is not empty 
               res.render("recipe/search", {data:data, q:search, page:page});
            }else{
               //this array is empty
               res.redirect("back");
            }
          } else {
            console.log("Something whent wrong!");
            console.log(result.status, result.headers);
            res.redirect("back");
          }    
    });
});

//SHOW - recipe by recipe id
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

// Add item to users whishlist
router.put("/wishlist/:user_id/:recipe_id",middleware.isLoggedIn, function(req, res){
    var id = req.body.id;
    var image_url = req.body.image_url;
    var publisher = req.body.publisher;
    var title = req.body.title;
    var newWishlistItem = {
        id: id, 
        image_url: image_url, 
        publisher: publisher, 
        title: title
    };
    User.findById(req.params.user_id, function(err, foundUser){
        if(err) {
            console.log(err);
        } else {
            console.log(newWishlistItem);
            foundUser.recipes.push(newWishlistItem);
            foundUser.save();
            console.log("New recipe added to user");
            res.redirect("back");
        }
    });
});

//Remove item from wishlist
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