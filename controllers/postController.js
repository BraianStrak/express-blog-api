var async = require('async');
var post = require('../models/post');

// Display list of all posts.
exports.index = function(req, res, next) {
    res.json({
        message: 'You made it to the secure route',
        user: req.user,
        token: req.query.secret_token
    })
}

// Display list of all posts.
exports.post_list = function(req, res) {
    res.send('NOT IMPLEMENTED: post list');
};

// Display detail page for a specific post.
exports.post_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: post detail');
};

// Display post create form on GET.
exports.post_create_get = function(req, res, next) {
    res.send('NOT IMPLEMENTED: post create GET');
};

// Handle post create on POST.
exports.post_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: post create POST');
};

// Display post delete form on GET.
exports.post_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: post delete GET');
};

// Handle post delete on POST.
exports.post_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: post delete POST');
};

// Display post update form on GET.
exports.post_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: post update GET');
};

// Handle post update on POST.
exports.post_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: post update POST');
};

