const mongoose = require('mongoose')

mongoose
  .connect(
    'mongodb+srv://' +
      process.env.DB_USER_PASS +
      '@groupomania.er4zc.mongodb.net/groupomania'
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Failed to connect to MongoDB', error))
