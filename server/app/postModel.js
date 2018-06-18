var mongoose = require('mongoose');
var PostSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
      },
    title: {
       type: String,
       required: true
      },
    text: {
       type: String,
       required: true
       }
});

var Post = mongoose.model("Post", PostSchema);
module.exports = Post;