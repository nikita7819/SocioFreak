const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    max: 200
  },
  likes: {
    type: Array,
    default: []
  },
  img: {
    type:String,
  },
},
{
  timestamps:true,
}
)

module.exports = mongoose.model('Posts', postSchema);