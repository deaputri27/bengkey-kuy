const express = require('express')
const userController = require('../controllers/userController')
const { authentication } = require('../middleware/authentication')
const router = express.Router()

// router.use(authentication)
router.post('/register', userController.register)
router.post('/login', userController.login)
// router.post('/google-signin', userController.loginGoogle)




module.exports = router