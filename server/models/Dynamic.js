const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  nickName: {type: String},
  userId: {type: String},
  headUrl: {type: String},
  content: {type: String},
  comment: [{content: {type: String},userId:{type: String}}],
  star: {type: Number},
  time: {type: Date}
})

module.exports = mongoose.model('Dynamic', schema)
