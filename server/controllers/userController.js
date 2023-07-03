const { comparePassword } = require('../helper/bcrypt')
const { signToken } = require('../helper/jwt')
const { User, OrderDetail, Product, Order } = require("../models")

// const { OAuth2Client } = require('google-auth-library');
const midtransClient = require('midtrans-client');
const { CoreApi } = require('midtrans-client');
const { createTransaction } = require('midtrans-client');
const { sequelize } = require('../models'); 

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
            // next(error);
            console.log(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email || !password) {
                throw { name: "Invalid email/password" }
            } // ini juga belum di handle di error handler
            const user = await User.findOne({ where: { email } })
            // console.log(user);
            if (!user) {
                res.status(401).json({ message: "InvalidToken" })
                return
            }
            const isValidPassword = comparePassword(password, user.password)
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

    // static async loginGoogle(req, res, next) {
    //     try {
    //         const googleToken = req.headers.google_token
    //         const client = new OAuth2Client(process.env.CLIENTID);
    //         const ticket = await client.verifyIdToken({
    //           idToken: googleToken,
    //           audience: process.env.CLIENTID
    //         });
    //         const payload = ticket.getPayload();
    //         const userid = payload['sub'];
    //         const [user, created] = await User.findOrCreate({
    //           where: { email: payload.email },
    //           defaults: {
    //             username: payload.name,
    //             password: "deacantik",
    //             phoneNumber: "12345",
    //             address: "jl.dea",
    //           },
    //         //   hooks: false
    //         })
    //         const access_token = signToken({
    //           id: user.id,
    //           email: user.email
    //         })
    //         res.json({ access_token })
    //     } catch (error) {
    //         next(error);
    //         console.log(error);
    //     }
    // }

    static async createOrder(req, res, next) {
        try {
            const { problem, lat, lng, car, carType, license } = req.body
            // console.log(req.body, ">>>>>>>>>>>");
            const geojson = {
                type: 'Point',
                coordinates: [lng, lat]
            };
            const toString = JSON.stringify(geojson)
            const response = await Order.create({ problem, location: toString, car, carType, userId: req.user.id, license })
            // console.log(response, ">>>>>>>>>>>>");
            res.status(201).json(response)
        } catch (err) {
            console.log(err);
            // next(err)
        }
    }


    static async getOrderAll(req, res, next) {
        try {
            const response = await Order.findAll()
            console.log(response);
            res.status(200).json(response)
        } catch (err) {
            console.log(err);
        }
    }


    static async generateMidtransToken(req, res, next) {
        try {
            const { orderId } = req.params

            const findUser = await User.findByPk(req.user.id)
            // if (findUser.isSubscribed) {
            //     throw { name: "already_subscribed" }
            // }

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
                where: { orderId: orderId }
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
                "payment_type": "bank_transfer",
                "transaction_details": {
                    "order_id": orderId,
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
            // console.log(midtransToken, ">>>>>>>>>>")


            res.status(201).json(midtransToken)

        } catch (error) {
            console.log(error);
        }
    }

    static async paymentStatus(req, res, next) {
        try {

            // console.log(req.body.transaction_status);
            const midtransRespond = req.body.transaction_status
            const id = req.body.order_id
            // console.log(orderId);

            if (midtransRespond === "settlement" || midtransRespond === "capture") {
                await Order.update({ paymentStatus: "isPaid" }, { where: { id } })
                
                res.status(200).json("pembayaran berhasil")
            }

        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = UserController