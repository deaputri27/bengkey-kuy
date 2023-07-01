const express = require('express')
const userController = require('../controllers/userController')
const authentication = require('../middleware/authentication')
const router = express.Router()

router.post('/register', userController.register)
router.post('/login', userController.login)
// router.post('/google-signin', userController.loginGoogle)

router.use(authentication)
router.post("/process-transaction", userController.generateMidtransToken)





module.exports = router