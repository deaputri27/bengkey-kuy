const express = require('express')
const partControllers = require('../controllers/partController')
const router = express.Router()
const authentication = require('../middleware/authentication')

router.post('/register', partControllers.register)
// router.post('/login', partControllers.login)
// router.post('/google-signin', partControllers.loginGoogle)

router.use(authentication)
router.post('/products', partControllers.createOrderDetail)
router.get('/products/:orderId', partControllers.readOrderDetail)
router.post('/send-email', partControllers.sendEmail)




module.exports = router