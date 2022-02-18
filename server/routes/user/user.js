module.exports = app => {
  const express = require('express')
  const router = express.Router() //子路由
  const jwt = require('jsonwebtoken')

  const User = require('../../models/User')

  // console.log(app.get('secret'), 'secret')

  router.post('/login', async (req, res) => {
    const {loginName, password} = req.body
    const user = {
      data: await User.findOne({loginName}).select('+password'),
      token: ''
    }

    const isValid = require('bcrypt').compareSync(password, user.data.password)
    if (isValid) {
      user.token = jwt.sign({id: user._id}, app.get('secret'))

      // console.log(req.body, 'b', user)

      return res.send(user)
    } else {
      return res.send({
        code: 1,
        message: '账号密码错误',
      })
    }
  })

//register
  router.post('/user/insert', async (req, res) => {
    const loginName = req.body.loginName;
    // console.log(req.body, 'b',loginName)
    const user = await User.findOne({loginName}).update()
    console.log(user, 'u')
    if (user.loginName) {
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

  //update userInfo
  router.post('/user/update', async (req, res) => {
    console.log(req.body, 'body')
    const user = {
      data: await User.findByIdAndUpdate(req.body.id, {
        nickName: req.body.nickName,
        headUrl: req.body.headUrl
      }, {new: true}),
      code: 0,
      message: ''
    }
    console.log(user, 'u')
    if (user.data) {
      user.code = 1
      user.message = '更新成功'
      // user.data.password = null
      return res.send(user)
    } else {
      user.code = 0
      user.message = 'id不存在'
      return res.send(user)
    }
  })

  ///update-password
  router.post('/user/update-password', async (req, res) => {
    const model = await User.findById(req.body.id).select('+password')

    console.log(req.body, 'body',model)
    const isValid = require('bcrypt').compareSync(req.body.oldPassword, model.password)

    if (isValid) {
      await model.updateOne({password: req.body.newPassword})
      return res.send({
        code: 1,
        message: '改密成功'
      })
    } else {
      res.send({
        code: 0,
        message: '原密码不符'
      })
    }

  })

  module.exports = router
}
