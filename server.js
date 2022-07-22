const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')

const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')

require('dotenv').config({ path: './config/.env' })
require('./config/db')

const { checkUser, requireAuth } = require('./middleware/authMiddleware')

const app = express()

// read body
app.use(express.json())

// Multer img download
app.use('/images', express.static(path.join(__dirname, '../images')))

// read url
app.use(express.urlencoded({ extended: true }))
// read cookie
app.use(cookieParser())

// jwt middleware
app.get('*', checkUser)
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
})

// routes
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)

// server
app.listen(process.env.PORT, () => {
  console.log(`Listenning on port ${process.env.PORT}`)
})
