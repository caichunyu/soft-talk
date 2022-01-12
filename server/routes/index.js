module.exports = app => {
  const express = require('express')
  const router = express.Router() //子路由
  const jwt = require('jsonwebtoken')

  const User = require('../models/User')


  router.post('/login', async (req, res) => {
    const {loginName, password} = req.body
    const user = {
      data: await User.findOne({loginName}).select('+password'),
      token:''
    }
    if (user.data.password === password) {
      user.token = jwt.sign({id: user._id}, app.get('secret'))

      console.log(req.body, 'b', user)

      return res.send(user)
    } else {
      return res.send({
        code: 1,
        message: '账号密码错误',
      })
    }

    // res.send(model);
    res.send('200')
  })

  //register
  router.post('/user/insert', async (req, res) => {
    const loginName = req.body.loginName;
    // console.log(req.body, 'b',loginName)
    const user = await User.findOne({loginName})
    console.log(user, 'u')
    if (user) {
      return res.send({
        code: 0,
        message: '用户存在'
      })
    } else {
      const model = await User.create(req.body)
      return res.status(200).send({
        code: 1,
        message: '注册成功',
      })
    }
  })

  app.use('/api', router)
}
