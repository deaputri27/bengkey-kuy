const express = require('express')
const partControllers = require('../controllers/partController')
const router = express.Router()
// const authentication = require('../middleware/authentication')

// router.use(authentication)
router.post('/register', partControllers.register)
// router.post('/login', partControllers.login)
// router.post('/google-signin', partControllers.loginGoogle)




module.exports = router