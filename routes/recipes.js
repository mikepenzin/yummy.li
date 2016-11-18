var express     = require("express"),
    unirest     = require("unirest"),
    router      = express.Router();


router.get("/", function(req, res){
    res.render("general/home");
});

// Used Environment variable (process.env.API_URL) for my personal API key from Food2Fork

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
    console.log(req.params.recipe_id);
    var url = "https://community-food2fork.p.mashape.com/get?key=" + process.env.API_URL + "&rId=" + req.params.recipe_id;
    unirest.get(url)
    .header("X-Mashape-Key", "Fj5xGp8OhGmshrg45yEPk5IvGe0xp1DCBIFjsnLHD4OsQxCvPD")
    .header("Accept", "application/json")
    .end(function (result) {
        if (result.statusCode == 200) {
            var data = JSON.parse(result.body);
            data = data.recipe;
            console.log(data); 
            res.render("recipe/show", {recipe:data});
          } else {
            console.log("Something whent wrong!");
            console.log(result.status, result.headers);
            res.redirect("back");
          }    
    });
});

module.exports = router;