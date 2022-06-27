const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // _id: {
  //   type:String,
  // },
  username: {
    type: String,
    required: true,
    unique: true,
    min: 5,
    max: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 30
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  followers: {
    type: Array,
    default: []
  },
  followings: {
    type: Array,
    default: []
  },
  likesCount: {
    type: Number,
    default: 0,
  },
  profilePicture: {
    type: String,
    default:"",
  },
  coverPicture: {
    type: String,
    default:"",
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  desc: {
    type: String,
    max:50
  },
  relationship: {
    type: Number,
    enum:[1,2,3]
  },
  city: {
    type:String
  },
  from: {
    type:String
  }
},
{
  timestamps:true,
}
)

module.exports = mongoose.model('User', userSchema);