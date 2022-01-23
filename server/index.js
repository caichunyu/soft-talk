const express = require('express')

const app = express()

app.set('secret','dghapohgae3423ojo') //token效验

console.log(app.get('secret'),'sssecret')

app.use(require('cors')()) //跨域
// parse application/x-www-form-urlencoded
// app.use(express.urlencoded())
// parse application/json
app.use(express.json())

require('./routes/index')(app)
require('./plugins/db')(app)



app.listen(3000, () => {
  console.log('localhost:3000')
})
