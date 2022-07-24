const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const { signUpErrors } = require('../utils/errorsUtils')

const maxAge = 24 * 60 * 60 * 1000

function createToken(id) {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  })
}

exports.signUp = (req, res) => {
  const user = new User({ ...req.body })
  user
    .save()
    .then(() => res.status(201).json({ message: 'Nouvel utilisateur créé' }))
    .catch((error) => {
      const errors = signUpErrors(error)
      res.status(400).json({ errors })
    })
}

exports.logIn = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password)
    const token = createToken(user._id)
    res.cookie('jwt', token, { httpOnly: true, maxAge })
    res.status(200).json({ user: user._id })
  } catch (error) {
    res.status(400).json({ error })
  }
}

// Delete cookie to kill session
exports.logOut = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 })
  res.redirect('/')
}
