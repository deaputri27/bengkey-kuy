const express = require('express')
const userController = require('../controllers/userController')
const authentication = require('../middleware/authentication')
const router = express.Router()

router.post('/register', userController.register)
router.post('/login', userController.login)
// router.post('/google-signin', userController.loginGoogle)

router.post("/payment-notification", userController.paymentStatus)

router.use(authentication)
router.get("/order", userController.getOrderAll)
router.post("/detail", userController.createOrder)
router.post("/process-transaction/:orderId", userController.generateMidtransToken)


module.exports = router