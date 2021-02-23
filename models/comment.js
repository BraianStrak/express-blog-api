var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema(
  {
    title: {type: String, required: true, maxlength: 100},
    description: {type: String, required: true, maxlength: 100},
    post: {type: Schema.Types.ObjectId, ref: 'Post', required: true},
  }
);

// Virtual for post's URL
CommentSchema
.virtual('url')
.get(function () {
  return '/comment/' + this._id;
});

module.exports = mongoose.model('Comment', CommentSchema);