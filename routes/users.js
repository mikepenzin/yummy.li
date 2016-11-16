var express = require("express");
var router = express.Router();


router.get("/:fgdfg", function(req, res){
    res.render("./general/home");
});

module.exports = router;