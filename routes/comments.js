var express = require('express');
var router = express.Router();
var comment_controller = require('../controllers/commentController');


// GET catalog home page. THIS CORRESPONDS TO website.com/comment because that is the url to get to this router
router.get('/', comment_controller.index);

// GET request for creating a comment. NOTE This must come before routes that display comment (uses id).
router.get('/create', comment_controller.comment_create_get);

// POST request for creating comment.
router.post('/create', comment_controller.comment_create_post);

// GET request to delete comment.
router.get('/:id/delete', comment_controller.comment_delete_get);

// POST request to delete comment.
router.post('/:id/delete', comment_controller.comment_delete_post);

// GET request to update comment.
router.get('/:id/update', comment_controller.comment_update_get);

// POST request to update comment.
router.post('/:id/update', comment_controller.comment_update_post);

// GET request for one comment.
router.get('/:id', comment_controller.comment_detail);

// GET request for list of all comment items.
router.get('/all', comment_controller.comment_list);


module.exports = router;
