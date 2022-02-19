const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  nickName: {type: String},
  userId: {type: String},
  content: {type: String},
  comment: [{content: {type: Array}}],
  star: {type: Number},
  time: {type: Date}
})

module.exports = mongoose.model('Dynamic', schema)
