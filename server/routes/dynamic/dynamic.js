  const express = require('express')
  const router = express.Router() //子路由
  const Dynamic = require('../../models/Dynamic')
  const User = require("../../models/User");

//insert dynamic
  router.post('/dynamic/insert', async (req, res) => {
    console.log(req.body, 'b')
    const model = await Dynamic.create(req.body)
    return res.status(200).send({
      code: 1,
      message: '新建动态成功',
    })
  })
  //all dynamic

  module.exports = router
