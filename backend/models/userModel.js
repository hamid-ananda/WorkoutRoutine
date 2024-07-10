//email and password field with mongoose
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new Schema({
    
    username: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//static signuo method
userSchema.statics.signUp = async function( username, email, password) {
    
    //
    if(!username) {    
        throw new Error('Please provide userName')}
    if(!email) {    
        throw new Error('Please provide email')}
    if(!password) {    
        throw new Error('Please provide password')}

    if(!validator.isEmail(email)) {
        throw new Error('Please provide valid email')
    }

    if (!validator.isStrongPassword(password)) {
        throw new Error('Please provide strong password')
    }

    const exists = await this.findOne({email})
    if (exists) {
        throw new Error('Email already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({ username,email, password: hash})
    return user
}

//static login method
userSchema.statics.login = async function(email, password) {
    if(!email || !password) {
        throw new Error('Please provide email and password')
    }
    
  const user = await this.findOne({email})
  if(!user) {
      throw new Error('User not found')
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if(!isMatch) {
      throw new Error('Invalid password')
  }
  return user
}


module.exports = mongoose.model('User', userSchema)