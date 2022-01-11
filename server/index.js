const express= require('express')

const app=express()

require('./routes/index')(app)
require('./plugins/db')(app)

app.listen(3000,()=>{
  console.log('localhost:3000')
})
