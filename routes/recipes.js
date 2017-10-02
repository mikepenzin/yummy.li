var express     = require("express"),
    request     = require("request"),
    middleware  = require('../middleware'),
    mongoose    = require('mongoose'),
    User        = require('../models/user'),
    Tags        = require('../models/tags'),
    Chance      = require('chance'),
    router      = express.Router();

// We use chance to generate random but unique numbers in getRandomData()
var chance = new Chance();

//  Index route - Show search form
router.get("/", middleware.PersonalPage, function(req, res){
    // Search all tags in DB, to use it in search form
    Tags.find({}, { _id: 0, tag: 1 }, function(err, foundTags){
        /* istanbul ignore next */
        if(err){ console.log(err); }
        var tags = [];
        // Retrieve tag from every tag
        foundTags.forEach(function (tag) {
            tags.push(tag.tag);
        });
        
        res.render("general/home", { tags: tags }); 
    });
});

//  Route for robots.txt file
router.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: ");
});

//  Used Environment variable (process.env.API_URL) for personal API key from Food2Fork

//  SHOW - search results for recipes - by ingridients 
router.get("/q", function(req, res){
    var search = req.query.search;
    var page = Number(req.query.page) || 1;
    var apiURL = process.env.API_URL;
    var url = "http://food2fork.com/api/search?key=" + apiURL + "&page=" + page + "&q=" + search + "&sort=r";
    request(url, function (error, response, body) {
        /* istanbul ignore else */ 
        var data = JSON.parse(body);
        /* istanbul ignore next */
        if (!(data.error) && !error && response.statusCode == 200) {
            data = data.recipes;
            Tags.find({}, { _id: 0, tag: 1 }, function(err, foundTags){
                if(err){ console.log(err); }
                var tags = [];
                foundTags.forEach(function (tag) {
                    tags.push(tag.tag);
                });
                /* istanbul ignore next */
                if(data.length !== 0){   
                    // this array is not empty 
                   res.render("recipe/search", {data:data, q:search, page:page, tags: tags});
                } else {
                    // this array is empty
                   res.render("recipe/noresults", {q:search, tags: tags});
                }
            });
            
        } else {
            
            console.log("Something whent wrong!");
            console.log(error);
            res.redirect("back");
        }
    });
});


//  SHOW - search results for recipes - by ingridients 
router.get("/trending", function(req, res){
    var page = Number(req.query.page) || 1;
    var apiURL = process.env.API_URL;
    var url = "http://food2fork.com/api/search?key=" + apiURL + "&page=" + page + "&q=&sort=t";
    request(url, function (error, response, body) {
        /* istanbul ignore next */ 
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            data = data.recipes;
            Tags.find({}, { _id: 0, tag: 1 }, function(err, foundTags){
                if(err){ console.log(err); }
                var tags = [];
                foundTags.forEach(function (tag) {
                    tags.push(tag.tag);
                });
                /* istanbul ignore next */
                if(data.length !== 0){   
                   // this array is not empty 
                   res.render("general/trending", {data:data, page:page, tags: tags});
                } else {
                   // this array is empty
                   res.render("recipe/noresults", {q:"", tags: tags});
                }
            });
            
        } else {
            console.log("Something whent wrong!");
            console.log(error);
            res.redirect("back");
        }
    });
});

// SHOW - Team page
router.get("/team", function(req, res){
    var team = true;
    var navbar = false;
    res.render("general/team", { team: team, navbar: navbar });
});


/* istanbul ignore next */
// Index route - Show search form
router.get("/:user_id", middleware.isLoggedIn, function(req, res){
    
    var userID = mongoose.Types.ObjectId(req.params.user_id); 
    
    // General data for trending search requests.
    var trendingPage = Math.ceil(Math.random() * (50 - 1) + 1);
    var apiURL = process.env.API_URL;
    var trending_url = "http://food2fork.com/api/search?key=" + apiURL + "&page=" + trendingPage  + "&q=&sort=t";
    
    // Search for all tags then for each object that found pass tag name into tags array.
    var tags = [];
    Tags.find({}, function(err, foundTags){
        /* istanbul ignore next */
        if(err){ console.log(err); }
        
        foundTags.forEach(function (tag) {
            tags.push(tag.tag);
        });
        
        // Search for trending recipes with random page number as parameter.
        request(trending_url, function (error, response, body) {
            var trending = JSON.parse(body);
            trending = trending.recipes;
            
            // Check if data we get without errors or status code of 200.
            // Need to add checks for "limit reached" situation.
            /* istanbul ignore next */
            if (!trending.error && !error && response.statusCode == 200 && trending.count != 0) {
                // Get data for current loggedin user
                User.findById(userID, function(err, foundUser){
                /* istanbul ignore if */
                    if (err) {
                        console.log(err);    
                    } else {
                        
                        // Update User data of last performed login.
                        // May add some functionality to this.
                        foundUser.latestLogin = Date.now();
                        foundUser.save();
                        /* istanbul ignore next */
                        // Check if current user have favorite foods inside his profile.
                        if ((foundUser.favFood.length > 0) && (foundUser.favFood[0] != "")) {
                            var search = foundUser.favFood;
                            search = search.join(", ");
                            var page;
                            
                            // Check if user favorite food count is less or equal to 3,
                            // If we have more than 3 theire is big possibility no much results for that.
                            if (foundUser.favFood.length < 3) { 
                                page = Math.ceil(Math.random() * 5); 
                            } else {
                                page = 1;
                            }
                            var url = "http://food2fork.com/api/search?key=" + apiURL + "&page=" + page + "&q=" + search + "&sort=r";
                            
                            // Search recipes by users favorite foods with random page number as parameter.
                            request(url, function (error, response, body) {
                                /* istanbul ignore else */ 
                                var featuredRecipes = JSON.parse(body);
                                // Generate array with random numbers using getRandomData function.
                                var randomData = getRandomData(foundUser.recipes.length);
                                var randomTrendingData = getRandomData(trending.length);
                                // Check if data we get without errors or status code of 200.
                                if (!(featuredRecipes.error) && !error && response.statusCode == 200 && featuredRecipes.count != 0) {
                                        
                                    featuredRecipes = featuredRecipes.recipes;
                                    // Check if array we've got isn't empty.
                                    if(featuredRecipes.length !== 0){ 
                                        
                                        // Generate arrays with random numbers using getRandomData function.
                                        var randomFeaturedData = getRandomData(featuredRecipes.length);
                                        res.render("general/personal", {
                                            user: foundUser, 
                                            featuredRecipes: featuredRecipes, 
                                            randomFeaturedData: randomFeaturedData, 
                                            randomData: randomData, 
                                            randomTrendingData: randomTrendingData, 
                                            trending: trending, 
                                            tags: tags
                                        });
                                    } else {
                                        res.render("general/personal", {
                                            user: foundUser, 
                                            randomData: randomData, 
                                            randomTrendingData: randomTrendingData, 
                                            trending: trending, 
                                            tags: tags
                                        });
                                    }
                                } else {
                                    res.render("general/personalNoData", {
                                        user: foundUser, 
                                        randomData: randomData, 
                                        randomTrendingData: randomTrendingData, 
                                        trending: trending, 
                                        tags: tags
                                    });
                                }
                            });
                        } else {
                            // Generate arrays with random numbers using getRandomData function.
                            var randomData = getRandomData(foundUser.recipes.length);
                            var randomTrendingData = getRandomData(trending.length);
                            res.render("general/personalNoData", {
                                user: foundUser, 
                                randomData: randomData, 
                                randomTrendingData: randomTrendingData, 
                                trending: trending, 
                                tags: tags
                            });
                        }
                    }
                });
            } else {
                
                User.findById(userID, function(err, foundUser){
                    /* istanbul ignore if */
                    if (err) {
                        console.log(err);    
                    } else {
                        foundUser.latestLogin = Date.now();
                        foundUser.save();
                        res.render("general/home", {user:foundUser, tags: tags });
                    }
                });
            }
        });
    });    
});

// SHOW - Recipe data
router.get("/recipe/:recipe_id", function(req, res){
    var apiURL = process.env.API_URL;
    var url = "http://food2fork.com/api/get?key=" + apiURL + "&rId=" + req.params.recipe_id;
    request(url, function (error, response, body) {
        /* istanbul ignore else */ 
        var data = JSON.parse(body);
        /* istanbul ignore next */
        if (!(data.error) && !error && response.statusCode == 200) {
            data = data.recipe;
            /* istanbul ignore next */
            if(data.length !== 0){ 
                if (req.isAuthenticated()) {
                    var found = false;
                    User.find({$and: [{ 'username': req.user.username },{'recipes.id': req.params.recipe_id}]}, function(err, recipe) {
                        if(err){ console.log(err); }
                        if (recipe.length > 0) {
                            found = true;
                        }
                        // this array is not empty 
                        res.render("recipe/show", { recipe:data, found:found });
                    });
                } else {
                    // this array is not empty 
                    res.render("recipe/show", { recipe:data });
                }
            } else {
                // this array is empty
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
//  UPDATE - Add recipe to User's wishlist
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
            req.flash("success", '"' + req.body.title + '" was added to your Wishlist!');
            res.redirect("back");
        }
    });
});

/* istanbul ignore next */ 
// UPDATE - Remove recipe from User's wishlist
router.put("/wishlist/:user_id/:recipe_id/remove",middleware.isLoggedIn, function(req, res){
    var id = req.params.recipe_id;
    
    User.findById(req.params.user_id, function (err, foundUser) {
        var recipe = foundUser.recipes; 
        /* istanbul ignore next */
        if (!err) {
            for (var i = 0; i < recipe.length; i++) {
                /* istanbul ignore next */
                if (recipe[i].id == id) {
                    foundUser.recipes[i].remove();
                    foundUser.save(function (err) {
                        /* istanbul ignore if */
                        if (err){
                            console.log(err);
                        } else {
                            req.flash("success", 'Recipe was removed from your Wishlist!');
                            res.redirect("back");
                        }
                    });
                }
            }
        }
    });
});


// Helpers functions

// The purpose of this function is to generate random but unique array of numbers 
// Get the parameter of number of recipes like currentUser.recipes.length. 
function getRandomData(numberOfRecipes) {
    var recipesForRandom = numberOfRecipes-1;
    var data;
    /* istanbul ignore next */
    if (numberOfRecipes > 0 && numberOfRecipes >=5) {
        data = chance.unique(chance.natural, 5, {min: 0, max: recipesForRandom});
        return data;
    } else if(numberOfRecipes > 0 && numberOfRecipes < 5) {
        data = chance.unique(chance.natural, numberOfRecipes, {min: 0, max: recipesForRandom});
        return data;
    } else {
        return 0;
    }
}

module.exports = router;