const db = require("../models");

const passport = require("passport")
module.exports = function(app){
    
    app.get("/", function(req, res){
        if(req.user){
            
        res.render("index",{user: req.user});

        }else{
            res.render("index");
        }
    });
    
    app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login'}));
    app.get("/login", function(req,res){
        console.log("Login GET");
        console.log(req.user)

        res.render("login");
    })
}