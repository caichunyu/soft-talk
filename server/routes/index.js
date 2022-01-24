module.exports = app => {
  //user部分
  require('./user/user')(app)
  const user = require('./user/user')
  app.use('/api', require('./user/user'))
}
