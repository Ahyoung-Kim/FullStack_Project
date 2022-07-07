const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  contents: String,
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }
})

module.exports = mongoose.model('Comment', commentSchema);