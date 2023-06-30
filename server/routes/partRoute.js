const express = require('express')
const partControllers = require('../controllers/userController')
const router = express.Router()


router.post('/register', partControllers.register)
router.post('/login', partControllers.login)
router.post('/google-signin', partControllers.loginGoogle)

router.use(authentication)



module.exports = router