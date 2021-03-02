//passport.js

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

/*passport.use(new LocalStrategy({
        username: 'username',
        password: 'password'
    }, 
    function (username, password, cb) {

//this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT

return UserModel.findOne({username, password})
           .then(user => {
               if (!user) {
                   return cb(null, false, {message: 'Incorrect username or password.'});
               }

return cb(null, user, {message: 'Logged In Successfully'});
          })
          .catch(err => cb(err));
    }
));*/

//should I be using CB instead of done function? 
passport.use( 
    new LocalStrategy((username, password, done) => {
      console.log("entered local strategy method for username: " + username + " and password: " + password);
  
      User.findOne({ username }, (error, user) => {
        if (error) {
          console.log("error in finding user");
          return done(error);
        }
        if (!user) {
          console.log("user does not exist");
          return done(null, false, { message: 'User non existent' });
        }
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            // passwords match! log user in
            console.log("passwords match, logging in");
            return done(null, user)
          } else {
            // passwords do not match!
            console.log("passwords do not match");
            return done(null, false, { message: "Incorrect password" })
          }
        })
      });
      
    })
  );

//middleware which only allows requests with valid tokens to access protected functions.
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'your_jwt_secret'
},
function (jwtPayload, cb) {

    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    return UserModel.findOneById(jwtPayload.id)
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
}
));

