const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  nickName: {type: String},
  loginName: {type: String},
  password:{type:String},
  headUrl:{type:String}
})

module.exports = mongoose.model('User',schema)
