const mongoose = require('mongoose')

const userScheme = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    img: String,
    token: {
        type: String
    },
    tokenExp: { // Experation
        type: Number
    }
})

const User = mongoose.model('User', userScheme)

module.exports = { User }