const { comparePassword } = require('../helper/bcrypt')
const { signToken } = require('../helper/jwt')
const midtransClient = require('midtrans-client');
const { User, Order, OrderDetail, Review, Product } = require('../models')

const { OAuth2Client } = require('google-auth-library');

class UserController {
    static async register(req, res, next) {
        try {
            const { username, email, password, phoneNumber } = req.body
            const createUser = await User.create({
                username,
                email,
                password,
                phoneNumber
            })
            res.status(201).json({ message: `user with id ${createUser.id} and email ${createUser.email} has been created` })
            // console.log(createUser, "<<<")
        } catch (error) {
            next(error);
            console.log(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            console.log(req.body, 'req body login userr<<');
            if (!email || !password) {
                throw { name: "Invalid email/password" }
            }
            const user = await User.findOne({ where: { email } })
            console.log(user, "userr<<");
            if (!user) {
                res.status(401).json({ message: "InvalidToken" })
                return
            }
            const isValidPassword = comparePassword(password, user.password)
            console.log(isValidPassword, "valid pass<<");
            if (!isValidPassword) {
                res.status(401).json({
                    message: "InvalidToken"
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
            next(error)
            console.log(error);
        }
    }

    static async review(req, res, next) {
        try {
            // console.log(req.user.dataValues.id);
            const user = req.user.dataValues.id
            const { id } = req.params
            const { review, rating, } = req.body

            // console.log(user, id, review, rating, `<<<<<<`);

            const  postReview  = await Review.create({
                userId: user, partnerId: id, review, rating
            })
            res.status(200).json({ postReview })
        } catch (err) {
            // next(err)
            console.log(err);
        }
    }

    static async getReview(req, res, next) {
        try {
            const { id } = req.params
            const review = await Review.findAll({
                where: { partnerId: id }
            })

            res.status(200).json(review)
        } catch (err) {
            next(err)
        }
    }

    static async createOrder(req, res, next) {
        try {
            const { problem, lat, lng, car, carType, license } = req.body;
            console.log(req.body, "req body orderrr<<");
            const geojson = {
                type: "Point",
                coordinates: [lng, lat],
            };
            const toString = JSON.stringify(geojson);
            console.log({
                problem,
                location: toString,
                car,
                carType,
                userId: 2,
                license,
            });
            const response = await  Order.create({
                problem,
                location: toString,
                car,
                carType,
                userId: 2,
                license,
            });
            res.status(201).json({message: "Order been success to create"});
        } catch (err) {
            console.log(err, "<<<<< error");
            next(err)
        }
    }
    static async getOrderDetail(req, res, next) {
        try {
            const { id } = req.params
            const response = await OrderDetail.findByPk(id)
            console.log(response, "<<< response");
            res.status(200).json(response)
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async updateStatus(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    }

    static async generateMidtransToken(req, res, next) {
        try {
            const findUser = await User.findByPk(req.user.id)

            let snap = new midtransClient.Snap({
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY,
            });

            const myProducts = await OrderDetail.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }, include: {
                    model: Product,
                },
                where: { orderId: 1 }
            })
            // res.status(201).json(myProducts[0])
            // console.log(myProducts[0], ">>>>>>>>>>>>>>>>");

            let totalPrice = 0
            for (let i = 0; i < myProducts.length; i++) {
                let price = myProducts[i].Product.price * myProducts[i].quantity
                totalPrice += price

            }
            // console.log(total);

            let items = []
            myProducts.forEach(el => {
                let obj = {}
                obj.id = el.productId
                obj.price = el.Product.price
                obj.quantity = el.quantity
                obj.name = el.Product.productName
                items.push(obj)
            });

            let parameter = {
                "transaction_details": {
                    "order_id": "TRANSACTION_" + Math.floor(1000000 + Math.random() * 9000000),
                    "gross_amount": totalPrice
                },
                "credit_card": {
                    "secure": true
                },
                "customer_details": {
                    // "first_name": "budi",
                    // "last_name": "pratama",
                    "email": findUser.email,
                    "phone": findUser.phoneNumber
                },
                "item_details": items
            };

            const midtransToken = await snap.createTransaction(parameter)
            // console.log(midtransToken, ">>>>>>>>>>");
            res.status(201).json(midtransToken)

        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = UserController