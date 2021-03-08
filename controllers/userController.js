var async = require('async');
var User = require('../models/user');

var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require("passport");

const { body,validationResult } = require("express-validator");

// Display list of all users.
exports.user_list = function(req, res) {
    res.send('NOT IMPLEMENTED: user list');
};

// Display detail page for a specific user.
exports.user_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: user detail');
};

// Display user create form on GET.
exports.user_create_get = function(req, res, next) {
    res.send('NOT IMPLEMENTED: user create GET');
};

// Handles user creation on POST
exports.user_create_post = [
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    res.json({
      message: 'Signup successful',
      user: req.user
    });
  }
];

// Display user delete form on GET.
exports.user_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: user delete GET');
};

// Handle user delete on POST.
exports.user_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: user delete POST');
};

// Display user update form on GET.
exports.user_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: user update GET');
};

// Handle user update on POST.
exports.user_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: user update POST');
};

exports.user_login_get = function(req, res) {
    res.send('logged in as: ' + req.user.username);
};

exports.user_login_post = function(req, res, next) {
    async (req, res, next) => {
        passport.authenticate(
          'login',
          async (err, user, info) => {
            try {
              if (err || !user) {
                const error = new Error('An error occurred.');
                return next(error);
              }
    
              req.login(
                user,
                { session: false },
                async (error) => {
                  if (error) return next(error);
    
                  const body = { _id: user._id, email: user.email };
                  const token = jwt.sign({ user: body }, 'TOP_SECRET');
    
                  return res.json({ token });
                }
              );
            } catch (error) {
              return next(error);
            }
          }
        )(req, res, next);
      }
};

exports.user_logout_get = function(req, res) {
    res.send('NOT IMPLEMENTED: user logout GET');
}
