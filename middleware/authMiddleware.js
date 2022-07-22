const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')

// Check user token
exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (error, decodedToken) => {
      if (error) {
        res.locals.user = null
        res.cookies('jwt', '', { maxAge: 1 })
        next()
      } else {
        let user = await User.findById(decodedToken.id)
        res.locals.user = user
        // console.log(res.locals.user)
        next()
      }
    })
  } else {
    res.locals.user = null
    next()
  }
}

// check that token match a user in the database
exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (error, decodedToken) => {
      if (error) {
        console.log(error)
      } else {
        console.log(decodedToken.id)
        next()
      }
    })
  } else {
    console.log('Pas de token')
  }
}
