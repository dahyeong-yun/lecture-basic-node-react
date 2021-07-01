const config = require('./config/key')
const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
const port = 4000
const { User } = require('./models/User')
const { auth } = require('./middleware/auth')

app.use(express.urlencoded({extended: true})) // application/x-www-form-urlencoded
app.use(express.json()); // application/json
app.use(cookieParser())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

/**
 * routers
 */
app.get('/', (req, res) => res.send('change test'))

app.post('/register', (req, res) => {
  // 회원 가입 정보 추출
  const user = new User(req.body)

  // 디비에 저장
  user.save((err, userInfo) => {
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})

app.post('/login', (req, res) => {
  // 요청 계정 정보 찾기
  User.findOne({email: req.body.email}, (err, user) => {
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      // 요청 계정 정보 존재시 비밀번호 인증
      if(!isMatch) return res.json({
        loginSuccess: false,
        message: "비밀번호가 틀렸습니다."
      })
      
      // 인증 완료시 토큰 생성
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err)
        res.cookie("x_auth", user.token)
        .status(200)
        .json({
          loginSuccess: true,
          userId: user._id
        })
      })
    })
  })
})


app.get('/api/users/auth', auth, (req, res) => {
  // auth 미들웨어가 인증 역할을 함
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email
    //name
    //lastname
    //role
    //image
  })
})

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({_id: req.user._id },
    { token: ""},
    (err, user) => {
      if(err) return res.json({ success: false, err})
      return res.status(200).send({
        success: true
      })
    })
})

app.listen(port, () => console.log(`${port}`))
