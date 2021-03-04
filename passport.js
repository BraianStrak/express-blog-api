//passport.js

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
/*
passport.use( 
    new LocalStrategy((username, password, done) => {
      console.log("entered local strategy method for username: " + username + " and password: " + password);
  
      User.findOne({ username }, (error, user) => {
        console.log("entered user finding method");
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
*/

passport.use(
    new LocalStrategy( (username, password, done) => {
        username = username.toLowerCase()
        User.findOne({username}, (err, user) => {
            if (err) {
                return done(err)
            }
            if (!user) {
                return done(null, false, {message: "Username does not exist"})
            }
            bcrypt.compare(password, user.password, (err, res) => {
                if (err) return console.log(err)
                if (!res) {
                    return done(null, false, {message: "Username and password do not match"})
                }
                return done(null, user)
            })
        })
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

