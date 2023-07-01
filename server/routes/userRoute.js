const express = require('express')
const userController = require('../controllers/userController')
const authentication = require('../middleware/authentication')
const router = express.Router()

router.post('/register', userController.register)
router.post('/login', userController.login)


router.post("/order", userController.createOrder)
router.get("/detail/:id", userController.getOrderDetail)

router.post('/google-signin', userController.loginGoogle)


router.use(authentication)
router.post('/review/:id', userController.review)
router.get('/review/:id', userController.getReview)



router.use(authentication)
router.post("/process-transaction", userController.generateMidtransToken)





module.exports = router