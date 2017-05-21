var middlewareObj = {};

/* istanbul ignore next */ 
middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect("/auth/login");
    }
};

/* istanbul ignore next */ 
middlewareObj.PersonalPage = function (req, res, next){
    if(req.isAuthenticated()){
        res.redirect("/" + req.user._id);
    } else {
        return next();
    }
};

module.exports = middlewareObj;