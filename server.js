const express = require("express");
const session = require('express-session');
//const { ExpressOIDC } = require('@okta/oidc-middleware');
const app = express();
const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function (username, password, done) {
        console.log(username + password + done);
        db.User.findOne({
            where: {
                username: username
            }
        }).then(function(user) {
            console.log("CHECKING WHAT WHAT AWASDASDASD" + user);
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          console.log(user)
          return done(null, user);
        });
    }
));
require('dotenv').config()
const PORT = process.env.PORT || 8080;

const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'this should be secure',
    resave: true,
    saveUninitialized: false
}));
// const oidc = new ExpressOIDC({
//     issuer: 'https://dev-260756.oktapreview.com/oauth2/default',
//     client_id: process.env.OKTA_ID || null,
//     client_secret: process.env.OKTA_SECRET,
//     redirect_uri: 'http://localhost:3000/authorization-code/callback',
//     scope: 'openid profile'
// });

//app.use(oidc.router);
app.use(passport.initialize());
app.use(passport.session());
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./controllers/router")(app);
//oidc.on('ready', () => {

//});
db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT: " + PORT);
    });
});

// oidc.on('error', err => {
//     console.log('Unable to configure ExpressOIDC', err);
//   });