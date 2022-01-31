const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  nickName: {type: String},
  loginName: {type: String},
  password:{
    type: String,
    select:false,
    set(val) {
      return require('bcrypt').hashSync(val, 10)
    }
  },
  headUrl:{type:String}
})

module.exports = mongoose.model('User',schema)
