var express     = require("express"),
    request     = require("request"),
    middleware  = require('../middleware'),
    mongoose    = require('mongoose'),
    User        = require('../models/user'),
    router      = express.Router();

//Index route - Show search form
router.get("/", middleware.PersonalPage, function(req, res){
    var title = "yummy.li -  Search recipes using ingredients you already have in the kitchen! What's in your fridge?";
    res.render("general/home", {title: title});
});

// Used Environment variable (process.env.API_URL) for personal API key from Food2Fork

//SHOW - search results for recipes - by ingridients 
router.get("/q", function(req, res){
    var search = req.query.search;
    var page = Number(req.query.page) || 1;
    var apiURL = process.env.API_URL;
    var url = "http://food2fork.com/api/search?key=" + apiURL + "&page=" + page + "&q=" + search + "&sort=r";
    request(url, function (error, response, body) {
        /* istanbul ignore else */ 
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
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
            console.log(error);
            res.redirect("back");
        }
    });
});


//SHOW - search results for recipes - by ingridients 
router.get("/trending", function(req, res){
    var page = Number(req.query.page) || 1;
    var apiURL = process.env.API_URL;
    var url = "http://food2fork.com/api/search?key=" + apiURL + "&page=" + page + "&q=&sort=t";
    request(url, function (error, response, body) {
        /* istanbul ignore else */ 
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            data = data.recipes;
            console.log(data);
            if(data.length !== 0){   
               //this array is not empty 
               res.render("general/trending", {data:data, page:page});
            } else {
               //this array is empty
               res.render("recipe/noresults", {q:""});
            }
        } else {
            console.log("Something whent wrong!");
            console.log(error);
            res.redirect("back");
        }
    });
});

//SHOW - Team page
router.get("/team", function(req, res){
    res.render("general/team");
});


/* istanbul ignore next */
//Index route - Show search form
router.get("/:user_id", middleware.isLoggedIn, function(req, res){
    
    var userID = mongoose.Types.ObjectId(req.params.user_id); 
    User.findById(userID, function(err, foundUser){
        /* istanbul ignore if */
        if (err) {
            console.log(err);    
        } else {
            if ((foundUser.favFood.length > 0) && (foundUser.favFood[0] != "")) {
                var search = foundUser.favFood;
                search = search.join(", ");
                var page = 1;
                if (foundUser.favFood.length <= 3) { 
                    page = Math.floor(Math.random() * 5); 
                }
                var trendingPage = Math.floor(Math.random() * 50);
                var apiURL = process.env.API_URL;
                var trending_url = "http://food2fork.com/api/search?key=" + apiURL + "&page=" + trendingPage  + "&q=&sort=t";
                var url = "http://food2fork.com/api/search?key=" + apiURL + "&page=" + page + "&q=" + search + "&sort=r";
                request(url, function (error, response, body) {
                    /* istanbul ignore else */ 
                    if (!error && response.statusCode == 200) {
                        var data = JSON.parse(body);
                        var dataCount = 5;
                        data = data.recipes;
                        if (data.length < 5) {
                            dataCount = data.length;
                        }
                        if(data.length !== 0){ 
                            request(trending_url, function (error, response, body) {
                                var trending = JSON.parse(body);
                                trending = trending.recipes;
                                //this array is not empty 
                                res.render("general/personal", {user:foundUser, data:data, recipeCount:foundUser.recipes.length, trending:trending, dataCount: dataCount});
                            });    
                        } else {
                            request(trending_url, function (error, response, body) {
                                var trending = JSON.parse(body);
                                trending = trending.recipes;
                                //this array is empty 
                                res.render("general/personal", {user:foundUser, recipeCount:foundUser.recipes.length, trending:trending});
                            }); 
                        }
                    } else {
                        console.log("Something whent wrong!");
                        console.log(error);
                        res.redirect("back");
                    }
                });
            } else {
                trendingPage = Math.floor(Math.random() * 50);
                apiURL = process.env.API_URL;
                trending_url = "http://food2fork.com/api/search?key=" + apiURL + "&page=" + trendingPage  + "&q=&sort=t";
                request(trending_url, function (error, response, body) {
                    var trending = JSON.parse(body);
                    trending = trending.recipes;
                    //this array is not empty 
                    res.render("general/personal", {user:foundUser, recipeCount:foundUser.recipes.length, trending:trending});
                }); 
            }
        }
    });
});

//SHOW - Recipe data
router.get("/recipe/:recipe_id", function(req, res){
    var apiURL = process.env.API_URL;
    var url = "http://food2fork.com/api/get?key=" + apiURL + "&rId=" + req.params.recipe_id;
    request(url, function (error, response, body) {
        /* istanbul ignore else */ 
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            data = data.recipe;
            if(data.length !== 0){   
               //this array is not empty 
               res.render("recipe/show", {recipe:data});
            } else {
               //this array is empty
               res.redirect("back");
                }
        } else {
            console.log("Something whent wrong!");
            console.log(error);
            res.redirect("back");
        }
    });
});

/* istanbul ignore next */ 
// UPDATE - Add recipe to User's wishlist
router.put("/wishlist/:user_id/:recipe_id",middleware.isLoggedIn, function(req, res){
    var newWishlistItem = {
        id: req.body.id, 
        image_url: req.body.image_url, 
        publisher: req.body.publisher, 
        title: req.body.title
    };
    var userID = mongoose.Types.ObjectId(req.params.user_id); 
    User.findById(userID, function(err, foundUser){
        /* istanbul ignore if */
        if(err) {
            console.log(err);
        } else {
            foundUser.recipes.push(newWishlistItem);
            foundUser.save();
            res.redirect("back");
        }
    });
});

/* istanbul ignore next */ 
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
                        /* istanbul ignore if */
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