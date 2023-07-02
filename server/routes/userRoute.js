const express = require('express')
const userController = require('../controllers/userController')
const { authentication } = require('../middleware/authentication')
const router = express.Router()

// router.use(authentication)
router.post('/register', userController.register)
router.post('/login', userController.login)
// router.post('/google-signin', userController.loginGoogle)
router.post("/order", userController.createOrder)
router.get("/order", userController.getOrderAll)
router.get("/detail/:id", userController.getOrderDetail)




module.exports = router