const express = require('express')
const router = express.Router() //子路由
const Dynamic = require('../../models/Dynamic')

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
router.get('/dynamic/list', async (req, res) => {
  return res.send({
    code: 1,
    message: '拉取动态列表成功',
    data: await Dynamic.find()
  })
})

//my dynamic && page dynamic
router.post('/dynamic/list',async (req,res)=>{
  const userId=req.body.userId;
  console.log(await Dynamic.find({userId}))
  return res.send({
    code:1,
    message: '拉取个人动态成功',
    data: await Dynamic.find({userId})
  })
})

//insert comment
router.post('/comment/insert', async (req, res) => {
  console.log(req.body, 'b')
  // const model = await Dynamic.create(req.body)
  // return res.status(200).send({
  //   code: 1,
  //   message: '新建动态成功',
  // })
})

module.exports = router
