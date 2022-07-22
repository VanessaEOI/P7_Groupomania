const router = require('express').Router()

const authController = require('../controllers/authController')
const userController = require('../controllers/userController')

// Auth
router.post('/signup', authController.signUp)
router.post('/login', authController.logIn)
router.get('/logout', authController.logOut)

// user database
router.get('/', userController.getAllUsers)
router.get('/:id', userController.getOneUser)
router.delete('/:id', userController.deleteUser)

module.exports = router
