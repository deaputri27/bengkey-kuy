const { describe, test, expect } = require('@jest/globals')
const request = require('supertest')
const app = require('../app')
const models = require('../models')
const bulkInsertCust = require('../helper/UserBulkInsert')
const { hashPassword } = require('../helper/bcrypt')
const { signToken } = require('../helper/jwt')
const { OrderDetail, Review } = require('../models')
const snap = require('../helper/midtransHelper')

// const models = require('../models')
jest.setTimeout(30000);

let access_token = ""
beforeAll(async function () {
    console.log("TEST<<<")
    try {
        const user = await bulkInsertCust()
        console.log(user, "<-----")
        access_token = signToken({
            id: user.id,
            email: user.email
        })
    } catch (err) {
        console.log(err, "<--");
    }
})
beforeEach(function () {
    jest.restoreAllMocks()
})
afterAll(async function () {
    await models.sequelize.close()
})
describe('User testing', function () {
    describe('Register user', function () {
        test('POST /users/register success', async function () {
            const response = await request(app)
                .post('/users/register')
                .send({ username: "deaimut", email: "justin@gmail.com", password: "inidea", phoneNumber: "081122333" })

            console.log(response.body, "<<<<<<");
            expect(response.status).toEqual(201)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('message')
            expect(typeof response.body.message).toEqual('string')
        })
        test('POST /users/register failed because email is empty', async function () {
            const response = await request(app)
                .post('/users/register')
                .send({ username: "deaimut", password: "inidea", phoneNumber: "081122333" })

            expect(response.status).toEqual(400)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('message', 'Email is invalid')
            expect(typeof response.body.message).toEqual('string')
        })
        test('POST /users/registerfailed because password is empty', async function () {
            const response = await request(app)
                .post('/users/register')
                .send({ username: "deaimut", email: "justin@gmail.com", password: "", phoneNumber: "081122333" })

            expect(response.status).toEqual(400)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('message', 'Password is require')
            expect(typeof response.body.message).toEqual('string')
        })
        test('POST /users/register failed because email is required', async function () {
            const response = await request(app)
                .post('/users/register')
                .send({ username: "deaimut", email: "", password: "inidea", phoneNumber: "081122333" })

            expect(response.status).toEqual(400)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('message', 'Email is require')
            expect(typeof response.body.message).toEqual('string')
        })
        test('POST /users/register failed because password is invalid', async function () {
            const response = await request(app)
                .post('/users/register')
                .send({ username: "deaimut", email: "justin@gmail.com", phoneNumber: "081122333" })

            expect(response.status).toEqual(400)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('message', 'Password is invalid')
            expect(typeof response.body.message).toEqual('string')
        })
        test('POST /users/register failed because email must be unique', async function () {
            const response = await request(app)
                .post('/users/register')
                .send({ username: "deaimut", email: "justin@gmail.com", password: "inidea", phoneNumber: "081122333" })

            expect(response.status).toEqual(400)
            console.log(response.status);
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('message', "email must be unique")
            expect(typeof response.body.message).toEqual('string')
        })
        test('POST /users/register failed because email format is incorrect', async function () {
            const response = await request(app)
                .post('/users/register')

                .send({ username: "deaimut", email: "justingmail.com", password: "inidea", phoneNumber: "081122333" })

            expect(response.status).toEqual(400)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('message', "Validation isEmail on email failed")
            expect(typeof response.body.message).toEqual('string')
        })
    })
    describe('Login testing', function () {
        // console.log(access_token,"+++");
        test('POST /users/login success', async function () {
            const response = await request(app)
                .post('/users/login')
                .send({ email: "deacantik@gmail.com", password: "inidea" })

            expect(response.status).toEqual(200)
            console.log(response.body, "access tokennnnnn niii<<<<");
            expect(typeof response.body).toEqual('object')
            expect(typeof response.body.access_token).toEqual('string')
            expect(typeof response.body.user).toEqual('object')
        })
        test('POST /users/login failed because wrong password input', async function () {
            const response = await request(app)
                .post('/users/login')
                .send({ email: "deacantik@gmail.com", password: "inidepp" })

            expect(response.status).toEqual(401)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('message', "Invalid email/password")
            expect(typeof response.body.message).toEqual('string')
        })
        test('POST /users/login failed because wrong email input', async function () {
            const response = await request(app)
                .post('/users/login')
                .send({ email: "kambing@gmail.com", password: "inidea" })

            expect(response.status).toEqual(401)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('message', "User not found")
            expect(typeof response.body.message).toEqual('string')
        })
        test('POST /users/login failed because email is empty', async function () {
            const response = await request(app)
                .post('/users/login')
                .send({
                    email: "",
                    password: "inidea",
                })
            expect(response.status).toEqual(400)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('message', "Email and Password is required")
            expect(typeof response.body.message).toEqual('string')
        })
    })
    describe('User Order', function () {
        test('POST /users/order success', async function () {
            const response = await request(app)
                .post('/users/order')
                .set({
                    access_token
                })
                .send({
                    partnerId: 1, problem: "ban muter", lat: "-6.940669415817259", lng: "107.5925576773082", car: "BMW", carType: "sedan", license: "B 232 EE"
                })
            expect(response.status).toEqual(201)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('response')
        })


        // test('POST /users/order fail create because Car is require', async function(){
        //     const response = await request(app)
        //     .post('/users/order')
        //     .set({
        //         access_token
        //     })
        //     .send({
        //         problem: "ban muter", lat: "-6.940669415817259",lng: "107.5925576773082", car: "", carType: "sedan", license: "B 232 EE"
        //     })
        //     expect(response.status).toEqual(400)
        //     expect(typeof response.body).toEqual('object')
        //     expect(response.body).toHaveProperty('msg', "Car is require")
        //     expect(typeof response.body.msg).toEqual('string')
        // })
        // test('POST /users/order fail create because Car type is require', async function(){
        //     const response = await request(app)
        //     .post('/users/order')
        //     .set({
        //         access_token
        //     })
        //     .send({
        //         problem: "ban muter", lat: "-6.940669415817259",lng: "107.5925576773082", car: "BMW", carType: "", license: "B 232 EE"
        //     })
        //     expect(response.status).toEqual(400)
        //     expect(typeof response.body).toEqual('object')
        //     expect(response.body).toHaveProperty('msg', "Car Type is require")
        //     expect(typeof response.body.msg).toEqual('string')
        // })
        // test('POST /users/order fail create because License is require', async function(){
        //     const response = await request(app)
        //     .post('/users/order')
        //     .set({
        //         access_token
        //     })
        //     .send({
        //         problem: "ban muter", lat: "-6.940669415817259",lng: "107.5925576773082", car: "BMW", carType: "bus", license: ""
        //     })
        //     expect(response.status).toEqual(400)
        //     expect(typeof response.body).toEqual('object')
        //     expect(response.body).toHaveProperty('msg', "license is require")
        //     expect(typeof response.body.msg).toEqual('string')
        // })
        test('GET /users/order success', async function () {
            const response = await request(app)
                .get('/users/order')
                .set({
                    access_token
                })

            expect(response.status).toEqual(200)
            expect(typeof response.body).toEqual('object')
            // console.log(response.body[0], "?/>?>?>");
            // expect(typeof response.body[0].id).toEqual('number')
        })
    })
    describe('Get User detail by id', function () {
        test('GET /users/detail/:id success', async function () {
            const response = await request(app)
                .get('/users/detail/1')
                .set({
                    access_token
                })
            // .send({})

            expect(response.status).toEqual(200)
            expect(typeof response.body).toEqual('object')
            console.log(response.body, "niii detail id<<<<");

            // expect(response.body.id).toHaveProperty('string')
            // expect(typeof response.body.message).toEqual('string')

        })
        test('GET /users/detail/:id failed because access token is invalid', async function () {
            const response = await request(app)
                .get('/users/detail/1')
                .set({
                    // access_token
                })
            // .send({})
            expect(response.status).toEqual(401)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('message', "Invalid Token")
            expect(typeof response.body.message).toEqual('string')
            console.log(response.body.message, "<<message");
        })
        test('GET /users/detail/:id failed because server error', async function () {
            jest.spyOn(OrderDetail, 'findAll').mockRejectedValue('Internal Server Error')
            const response = await request(app)
                .get('/users/detail/1')
                .set({
                    access_token
                })

            expect(response.status).toEqual(500)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toEqual('Internal Server Error')
        })
    })
    describe('Post User review by Id', function () {
        test('POST /users/review/:id success', async function () {
            const response = await request(app)
                .post('/users/review/1')
                .set({
                    access_token
                })

            expect(response.status).toEqual(200)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('postReview')
            expect(typeof response.body.postReview).toEqual("object")
            expect(typeof response.body.postReview.id).toEqual('number')
            expect(typeof response.body.postReview.userId).toEqual('number')
            expect(typeof response.body.postReview.partnerId).toEqual('number')
            expect(typeof response.body.postReview.review).toEqual('object')
            expect(typeof response.body.postReview.rating).toEqual('object')
            console.log(response.c, "<< post reveiw");
        })
        test('POST /users/review/:id failed because access token is invalid', async function () {
            const response = await request(app)
                .post('/users/review/1')
                .set({
                    // access_token
                })
            // .send({})
            expect(response.status).toEqual(401)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('message', "Invalid Token")
            expect(typeof response.body.message).toEqual('string')
            console.log(response.body.message, "<<message");
        })
        // test.only('POST /users/review/:id failed because server error', async function () {
        //     jest.spyOn(Review, 'create').mockRejectedValue('Internal Server Error')
        //     const response = await request(app)
        //         .post('/users/review/1')
        //         .set({
        //             // access_token
        //         })
        //     // .send({})
        //     console.log(response.status, "??");
        //     expect(response.status).toEqual(500)
        //     expect(typeof response.body).toEqual('object')
        //     expect(response.body).toHaveProperty('message')
        //     expect(response.body.message).toEqual('Internal Server Error')
        // })
        test('GET /users/review/:id success', async function () {
            const response = await request(app)
                .get('/users/review/1')
                .set({
                    access_token
                })
            expect(response.status).toEqual(200)
            expect(typeof response.body[0]).toEqual('object')
            expect(typeof response.body[0].id).toEqual('number')
            expect(typeof response.body[0].userId).toEqual('number')
            expect(typeof response.body[0].partnerId).toEqual('number')
            expect(typeof response.body[0].review).toEqual('object')
            expect(typeof response.body[0].rating).toEqual('object')
        })
        test('GET /users/review/:id failed because access token is invalid token', async function () {
            const response = await request(app)
                .get('/users/review/1')
                .set({
                    // access_token
                })
            expect(response.status).toEqual(401)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('message', "Invalid Token")
            expect(typeof response.body.message).toEqual('string')
        })
    })

    // describe('PUT User order update order', function () {
    //     test('PUT /users/order/:orderId success', async function () {
    //         const response = await request(app)
    //             .put('/users/order/3')
    //             .set({
    //                 access_token
    //             })
    //             .send({
    //                 problem: "ini masalah",
    //                 car: "BMW",
    //                 carType: "brum-brum",
    //                 license: "B 202 WOW"
    //             })

    //         expect(response.status).toEqual(200)
    //         expect(typeof response.body).toEqual('object')
    //         expect(response.body).toHaveProperty('message')
    //         expect(typeof response.body.message).toEqual('string')

    //     })
    //     test('PUT /users/order/:orderId failed because problem column not filled', async function () {
    //         const response = await request(app)
    //             .put('/users/order/3')
    //             .set({
    //                 access_token
    //             })
    //             .send({
    //                 problem: "",
    //                 car: "BMW",
    //                 carType: "brum-brum",
    //                 license: "B 202 WOW"
    //             })

    //         expect(response.status).toEqual(400)
    //         expect(typeof response.body).toEqual('object')
    //         expect(response.body).toHaveProperty('message', 'Problem is require')
    //         expect(typeof response.body.message).toEqual('string')
    //         console.log(response.c, "<< post reveiw");
    //     })
    //     test('PUT /users/order/:orderId failed because car column not filled', async function () {
    //         const response = await request(app)
    //             .put('/users/order/3')
    //             .set({
    //                 access_token
    //             })
    //             .send({
    //                 problem: "ada masalah",
    //                 car: "",
    //                 carType: "brum-brum",
    //                 license: "B 202 WOW"
    //             })

    //         expect(response.status).toEqual(400)
    //         expect(typeof response.body).toEqual('object')
    //         expect(response.body).toHaveProperty('message')
    //         expect(typeof response.body.message).toEqual('string')
    //         console.log(response.c, "<< post reveiw");
    //     })
    //     test('PUT /users/order/:orderId failed because carType column not filled', async function () {
    //         const response = await request(app)
    //             .put('/users/order/3')
    //             .set({
    //                 access_token
    //             })
    //             .send({
    //                 problem: "ada masalah",
    //                 car: "BMW",
    //                 carType: "",
    //                 license: "B 202 WOW"
    //             })

    //         expect(response.status).toEqual(400)
    //         expect(typeof response.body).toEqual('object')
    //         expect(response.body).toHaveProperty('message', 'car Type is require')
    //         expect(typeof response.body.message).toEqual('string')
    //         console.log(response.c, "<< post reveiw");
    //     })
    //     test('PUT /users/order/:orderId failed because license column not filled', async function () {
    //         const response = await request(app)
    //             .put('/users/order/3')
    //             .set({
    //                 access_token
    //             })
    //             .send({
    //                 problem: "ada masalah",
    //                 car: "BMW",
    //                 carType: "brum-brum",
    //                 license: ""
    //             })

    //         expect(response.status).toEqual(400)
    //         expect(typeof response.body).toEqual('object')
    //         expect(response.body).toHaveProperty('message', 'license is require')
    //         expect(typeof response.body.message).toEqual('string')
    //         console.log(response.c, "<< post reveiw");
    //     })

    // })

    describe('PUT User order status by order id', function () {
        test('PUT /users/order/status/:orderId success', async function () {
            const response = await request(app)
                .put('/users/order/status/9')
                .set({
                    access_token
                })

            expect(response.status).toEqual(201)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toEqual('entity with id 9 updated ')

        })
        test('PUT /users/order/status/:orderId failed because access token is Invalidtoken', async function () {
            const response = await request(app)
                .put('/users/order/status/9')
                .set({
                    // access_token
                })

            expect(response.status).toEqual(401)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toEqual('Invalid Token')

        })
    })
    describe('GET User order detail by order id', function () {
        test('GET /users/order/detail/:orderId success', async function () {
            const response = await request(app)
                .get('/users/order/detail/1')
                .set({
                    access_token
                })
            expect(response.status).toEqual(200)
            expect(typeof response.body).toEqual('object')
            // expect(typeof response.body.id).toEqual('number')
            // expect(typeof response.body.problem).toEqual('string')
            // expect(typeof response.body.location).toEqual('object')
            // expect(typeof response.body.totalPrice).toEqual('object')
            // expect(typeof response.body.status).toEqual('string')
            // expect(typeof response.body.car).toEqual('string')
            // expect(typeof response.body.carType).toEqual('string')
            // // expect(typeof response.body.lisence).toEqual('string')
            // expect(typeof response.body.userId).toEqual('number')
        })
        test('GET /users/order/detail/:orderId failed because access token is Invalidtoken', async function () {
            const response = await request(app)
                .put('/users/order/detail/1')
                .set({
                    // access_token
                })
            expect(response.status).toEqual(401)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toEqual('Invalid Token')
        })
    })
    describe('POST User order detail by order id', function () {
        test('POST /users/order/detail/:orderId success', async function () {
            const response = await request(app)
                .post('/users/order/detail/1')
                .set({
                    access_token
                })
                .send({ productId: 1, quantity: 2 })

            expect(response.status).toEqual(201)
        })
        test('POST /users/order/detail/:orderId failed because product id is missing', async function () {
            const response = await request(app)
                .post('/users/order/detail/10')
                .set({
                    access_token
                })
                .send({ productId: "", quantity: 2 })
            expect(response.status).toEqual(400)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('message', 'Product Id is required')
            expect(typeof response.body.message).toEqual('string')

        })
        test('POST /users/order/detail/:orderId failed because quantity is missing', async function () {
            const response = await request(app)
                .post('/users/order/detail/10')
                .set({
                    access_token
                })
                .send({ productId: 1, quantity: "" })
            expect(response.status).toEqual(400)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('message')
            expect(typeof response.body.message).toEqual('string')
        })
        test('POST /users/order/detail/:orderId failed because acess token is invalid', async function () {
            const response = await request(app)
                .post('/users/order/detail/10')
                .set({
                    // access_token
                })
                .send({ productId: 1, quantity: "" })

            expect(response.status).toEqual(401)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toEqual('Invalid Token')
        })
    })
    describe('POST User midtrans payments by order id', function () {
        test('POST /users/process-transaction/:orderId success', async function () {
            jest.spyOn(snap, 'createTransaction').mockResolvedValue({
                "token": "d30a74ec-0efe-42d9-8a14-87fbc52294b2",
                "redirect_url": "https://app.sandbox.midtrans.com/snap/v3/redirection/d30a74ec-0efe-42d9-8a14-87fbc52294b2"
            })
            const response = await request(app)
                .post('/users/process-transaction/1')
                .set({
                    access_token
                })
            expect(response.status).toEqual(201)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('token')
            expect(typeof response.body.token).toEqual('string')
            expect(response.body).toHaveProperty('redirect_url')
            expect(typeof response.body.redirect_url).toEqual('string')


        })
    })
    describe('User payment success', function(){
        test('POST /users/payment-status success', async function(){
            const response = await request(app)
            .post('/users/payment-status')
            .set({
                access_token
            })
            .send({

                    "transaction_time": "2020-01-09 18:27:19",
                    "transaction_status": "capture",
                    "transaction_id": "57d5293c-e65f-4a29-95e4-5959c3fa335b",
                    "status_message": "midtrans payment notification",
                    "status_code": "200",
                    "signature_key": "16d6f84b2fb0468e2a9cf99a8ac4e5d803d42180347aaa70cb2a7abb13b5c6130458ca9c71956a962c0827637cd3bc7d40b21a8ae9fab12c7c3efe351b18d00a",
                    "payment_type": "credit_card",
                    "order_id": 1,
                    "merchant_id": "G141532850",
                    "masked_card": "48111111-1114",
                    "gross_amount": "10000.00",
                    "fraud_status": "accept",
                    "eci": "05",
                    "currency": "IDR",
                    "channel_response_message": "Approved",
                    "channel_response_code": "00",
                    "card_type": "credit",
                    "bank": "bni",
                    "approval_code": "1578569243927"
            })
            expect(response.status).toEqual(200)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('message', 'Payment Success')
            expect(typeof response.body.message).toEqual('string')
        })
    })
    describe('GET User distance find store by radius', function(){
        test('GET /users/distance success', async function(){
            const response = await request(app)
            .get(`/users/distance?lat=106.98204234&long=-0.123123`)
            .set({
                access_token
            })
            // console.log(response.body, "??>?>?>?");
            expect(response.status).toEqual(200)
            expect(typeof response.body).toEqual('object')
        })
        test('GET /users/distance failed because internal server errorr', async function(){
            const response = await request(app)
            .get(`/users/distance?lat=&long=-0.123123`)
            .set({
                access_token
            })
            // console.log(response.body, "??>?>?>?");
            expect(response.status).toEqual(500)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('message', 'Internal Server Error')
            expect(typeof response.body.message).toEqual('string')
        })
    })
})
