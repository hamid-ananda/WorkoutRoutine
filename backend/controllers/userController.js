//login and signup user
const User = require('../models/userModel')
//json webtocken package
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d'})
}

// async login user
const loginUser = async (req, res) => {
    const {email, password} = req.body
    try {
      const user = await User.login(email, password)
      //create token
      const token = createToken(user._id)
  
      res.status(200).json({email, user, token})
    }
    catch (error) {
      res.status(400).json({error: error.message})
    }
}

// async signup user
const signupUser = async (req, res) => {
    const { username, email, password } = req.body
  try {
    const user = await User.signUp( username, email, password)
    //create token
    const token = createToken(user._id)

    res.status(200).json({ username, email, user, token })
  }
  catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = {loginUser, signupUser}
