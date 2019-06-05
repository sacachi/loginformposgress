var express = require('express');
var router = express.Router();

var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
        clientID: "2430097613683929",
        clientSecret: "5bd9c4bddca7da418ea8543eb5c0b924",
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'photos', 'email']
    },


    function(accessToken, refreshToken, profile, done) {
            db.user.findOne({where : {
            facebookId: profile.id
      }}).then(function (result) {
            if(result) {
                return done(null,result)
                }
        var newUser = {
            username: profile.id,
            name: profile.displayName,
            email: profile.id + '@facebook.com',
            facebookId: profile.id,
            profileImage: 'noimage.png',
            password: ''
        }
        db.user.create(newUser).then(function (user) {
          done(null,user);
        })
      }).catch(function (err) {
          done(err);
      })
    }
));

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/',
      failureRedirect: 'users/login' }));
/* GET home page. */
router.get('/', checkAuthenticated,function(req, res, next) {
  res.render('index', { title: 'Member' });
});


function checkAuthenticated(req,res,next){
  if(req.isAuthenticated()){
    return next();
  } else {
    res.redirect('/users/login');
  }
}

module.exports = router;
