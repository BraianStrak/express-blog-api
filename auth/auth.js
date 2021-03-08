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