module.exports = app => {
  const express = require('express')
  const router = express.Router() //子路由

  router.post('/login',async (req,res)=>{
    res.send('Hello World! login');

  })

  app.use('/api', router)
}
