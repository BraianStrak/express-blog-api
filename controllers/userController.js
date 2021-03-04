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

    body('username', 'User name required').trim().isLength({ min: 1 }).escape(),
    body('password', 'Password required').isLength({ min: 8 }), //I don't think passwords should be escaped.

    // Process request after validation and sanitization.
    (req, res, next) => {
        const errors = validationResult(req);
        console.log("creating user");

        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            // if err, do something
            // otherwise, store hashedPassword+user in DB
            if(err){
                console.log("Error in creating user: " + err);
                return next(err);
            } else {
                var user = new User (
                    {
                     username: req.body.username,
                     password: hashedPassword,
                    }
                )

                user.save((error) => {
                    if (error) {
                      console.log("Error in saving user: " + error);
                      return next(error);
                    }
                });

                res.end();
            }
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
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right: ' + err,
                user : user
            });
        }

        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }

        // generate a signed json web token with the contents of user object and return it in the response
        const token = jwt.sign(user, 'your_jwt_secret');
           return res.json({user, token});
        });
    })(req, res, next);
};

exports.user_logout_get = function(req, res) {
    res.send('NOT IMPLEMENTED: user logout GET');
}
