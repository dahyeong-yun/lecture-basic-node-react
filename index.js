const mongodb = require('./database')
const express = require('express')
const app = express()
const port = 4000
const { User } = require('./models/User')

// application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}))
// application/json
app.use(express.json());

const mongoose = require('mongoose')
mongoose.connect(mongodb.url, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('change test'))

app.post('/register', (req, res) => {
  // TODO 회원 가입 정보 추출
  const user = new User(req.body)

  // TODO 디비에 저장
  user.save((err, userInfo) => {
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})

app.listen(port, () => console.log(`${port}`))
