var express     = require("express"),
    unirest     = require("unirest"),
    router      = express.Router();


router.get("/", function(req, res){
    res.render("general/home");
});


router.get("/q", function(req, res){
    var search = req.query.search;
    var page = Number(req.query.page) || 1;
    unirest.get("https://community-food2fork.p.mashape.com/search?key=ec0cc812a67bdf0f980e49db6f3fca85&page=" + page + "&q=" + search + "&sort=r")
    .header("X-Mashape-Key", "Fj5xGp8OhGmshrg45yEPk5IvGe0xp1DCBIFjsnLHD4OsQxCvPD")
    .header("Accept", "application/json")
    .end(function (result) {
        if (result.statusCode == 200) {
            var data = JSON.parse(result.body);
            data = data.recipes;
            if(data.length > 0){   
               //this array is not empty 
               res.render("recipe/search", {data:data, q:search, page:page});
            }else{
               //this array is empty
               res.redirect("back");
            }
          } else {
            console.log("Something whent wrong!");
            console.log(result.status, result.headers);
          }    
    });
});


router.get("/q/ref", function(req, res){
    var search = req.query.search;
    var restrictions = req.query.restrictions;
    var cousine = req.query.cousine;
    var meal = req.query.meal;
    unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?addRecipeInformation=false&cuisine=" + cousine + "&diet=&fillIngredients=false&includeIngredients=" + search + "&intolerances=" + restrictions + "&limitLicense=false&offset=0&query=&ranking=2&type="+ meal)
    .header("X-Mashape-Key", "tCT2wqvYHGmshbK1SlktapWjEhP1p1rxFmYjsnJtzd5AJysylS")
    .header("Accept", "application/json")
    .end(function (result) {
        if (result.statusCode == 200) {
            var data = result.body.results;
            data = data.filter(function(recipe) {
                return recipe.likes > 0;
            });
            var numFound = data.length;
            res.render("recipe/search", {data:data.sort(dynamicSort("likes")), length:numFound, q:search}); 
          } else {
            console.log("Something whent wrong!");
            console.log(result.status, result.headers);
          }    
    });
});


router.get("/recipe/:recipe_id", function(req, res){
    console.log(req.params.id);
    res.render("recipe/show");
});


function dynamicSort(property) {
    var sortOrder = -1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

module.exports = router;