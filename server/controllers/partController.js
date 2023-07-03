const { comparePassword } = require('../helper/bcrypt')
const { signToken } = require('../helper/jwt')
const { Partner, Product, OrderDetail, User } = require('../models')
class PartControllers {
    static async register(req, res, next) {
        try {
            const { partnerName, email, password, phoneNumber, address } = req.body
            const createPartner = await Partner.create({
                partnerName,
                email,
                password,
                phoneNumber,
                address
            })
            res.status(201).json({ message: `user with id ${createPartner.id} and email ${createPartner.partnerName} has been created` })
            // console.log(createUser, "<<<")
        } catch (error) {
            next(error);
            console.log(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email || !password) {
                throw { name: "Invalid email/password" }
            }
            const user = await Partner.findOne({ where: { email } })

            if (!user) {
                res.status(401).json({ message: "User not found" })
                return
            }
            const isValidPassword = comparePassword(password, user.password)
            if (!isValidPassword) {
                res.status(401).json({
                    message: "Invalid email/password"
                }) // ini juga
                return
            }
            const access_token = signToken({
                id: user.id,
                email: user.email
            })
            // console.log(access_token, "<<<<fyfy");
            res.json({
                access_token,
                email,
            })
        } catch (error) {
            next(error);
            console.log(error, "<<err");
        }
    }

    static async loginGoogle(req, res, next) {
        try {
            const googleToken = req.headers.google_token
            console.log(req.headers, "<<<<<");
            const client = new OAuth2Client(process.env.CLIENTID);
            const ticket = await client.verifyIdToken({
              idToken: googleToken,
              audience: process.env.CLIENTID
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];
            const [user, created] = await User.findOrCreate({
              where: { email: payload.email },
              defaults: {
                username: payload.name,
                password: "deacantik",
                phoneNumber: "12345",
                address: "jl.dea",
              },
              hooks: false
            })
            const access_token = signToken({
              id: user.id,
              email: user.email
            })
            res.json({ access_token })
        } catch (error) {
            next(error);
            console.log(error);
        }
    }

    static async createOrderDetail(req, res, next) {
        try {
            const { productId } = req.params
            const products = await Product.findByPk(productId)
            if (!products) {
                throw { name: "NotFound" }
            }

            const findUser = await User.findByPk(req.user.id)
            // console.log(findUser, ">>>>>>>>>>>>>>>>");

            const myProduct = await OrderDetail.create({
                orderId: 1,
                productId: productId,
                quantity: req.body.quantity
            })

            res.status(201).json({
                id: myProduct.id,
                orderId: myProduct.orderId,
                productId: myProduct.productId,
                quantity: myProduct.quantity
            })

        } catch (error) {
            console.log(error);
            if (error.name === "NotFound") {
                res.status(404).json({ message: "Product not found" })
            } else {
                res.status(500).json({ message: "Internal server error" })
            }
        }
    }

    static async readOrderDetail(req, res, next) {
        try {
            const myProducts = await OrderDetail.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }, include: {
                    model: Product,
                    attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt']
                    }
                },
                where: { orderId: 1 }
            })
            // console.log(myProducts, ".>>>>>>>>>>>>>>>>");
            res.status(200).json(myProducts)

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" })
        }
    }

}

module.exports = PartControllers