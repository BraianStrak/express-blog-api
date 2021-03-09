const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../models/user');

//middleware which handles user registration
 passport.use(
    'signup',
    new localStrategy(
      {
        usernameField: 'username',
        passwordField: 'password'
      },
      async (username, password, done) => {
        try {
          const user = await UserModel.create({ username, password });
  
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
);

//middleware which handles user login
passport.use(
'login',
new localStrategy(
    {
    usernameField: 'username',
    passwordField: 'password'
    },
    async (username, password, done) => {
    try {
        const user = await UserModel.findOne({ username });

        if (!user) {
        return done(null, false, { message: 'User not found' });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
        return done(null, false, { message: 'Wrong Password' });
        }

        return done(null, user, { message: 'Logged in Successfully' });
    } catch (error) {
        return done(error);
    }
    }
)
);

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
//verifies token has been signed with the secret or key set during logging in, if the token is valid user details are passed to the next middleware.
passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'TOP_SECRET',
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);