const mongoose = require('mongoose')
const bctypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

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
    password: {
        type: String,
        minlength: 5
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

userScheme.pre('save', function( next ) {
    const user = this;
    if(user.isModified('password')) {
        // 비밀 번호 암호화
        bctypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err)
            bctypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

userScheme.methods.comparePassword = function(plainPassword, cb) {
   bctypt.compare(plainPassword, this.password, function(err, isMatch) {
       if(err) return cb(err)
       cb(null, isMatch)
   })
}

userScheme.methods.generateToken = function(cb) {
    const user = this
    user.token = jwt.sign(user._id.toHexString(), 'secretToken')
    user.save(function(err, user) {
        if(err) return cb(err)
        cb(null, user)
    })
}

userScheme.statics.findByToken = function(token, cb) {
    const user = this

    jwt.verify(token, 'secretToken', function(err, decode) {
        user.findOne({"_id": decode, "token": token}, function(err, user) {
            if(err) return cb(err)
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userScheme)

module.exports = { User }