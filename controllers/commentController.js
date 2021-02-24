var async = require('async');
var comment = require('../models/comment');

// Display list of all comments.
exports.comment_list = function(req, res) {
    res.send('NOT IMPLEMENTED: comment list');
};

// Display detail page for a specific comment.
exports.comment_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: comment detail');
};

// Display comment create form on GET.
exports.comment_create_get = function(req, res, next) {
    res.send('NOT IMPLEMENTED: comment create GET');
};

// Handle comment create on POST.
exports.comment_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: comment create POST');
};

// Display comment delete form on GET.
exports.comment_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: comment delete GET');
};

// Handle comment delete on POST.
exports.comment_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: comment delete POST');
};

// Display comment update form on GET.
exports.comment_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: comment update GET');
};

// Handle comment update on POST.
exports.comment_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: comment update POST');
};