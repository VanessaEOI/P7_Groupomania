const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// for email validation
const { isEmail } = require('validator')

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 100,
      minlength: 6,
    },
    likes: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
)

// This will be played before saving new user to hash and salt the user password
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Check if user exist and if yes compare password with bcrypt
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email })
  if (user) {
    const auth = await bcrypt.compare(password, user.password)
    if (auth) {
      return user
    }
    throw Error('Mot de passe incorrect')
  }
  throw Error('Email incorrect')
}

module.exports = mongoose.model('User', userSchema)
