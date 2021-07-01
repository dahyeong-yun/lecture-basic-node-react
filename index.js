const mongodb = require('./database.js')
const express = require('express')
const app = express()
const port = 4000

const mongoose = require('mongoose')
mongoose.connect(mongodb.url, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hi'))

app.listen(port, () => console.log(`ex${port}`))
