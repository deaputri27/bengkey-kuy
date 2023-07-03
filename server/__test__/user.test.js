// const { describe, test, expect } = require('@jest/globals')
// const request = require('supertest')
// const app = require('../app')
// const models = require('../models')
// const bulkInsertCust = require('../helper/UserBulkInsert')
// const {hashPassword} = require('../helper/bcrypt')
// const { signToken } = require('../helper/jwt')
// // const models = require('../models')
// let access_token = ""
// beforeAll(async function(){

//     const user = await bulkInsertCust()
//     access_token = signToken({
//         id: user.id,
//         email: user.email
//     })
// })
// afterAll(async function() {
//     await models.sequelize.close()
// })
// describe('User testing', function(){
//     describe('Register user', function(){
//         test('POST /users/register success', async function(){
//             const response = await request(app)
//             .post('/users/register')
//             .send({username: "deaimut",email: "justin@gmail.com",password: "inidea",phoneNumber: "081122333"})

//             console.log(response.body, "<<<<<<");
//             expect(response.status).toEqual(201)
//             expect(typeof response.body).toEqual('object')
//             expect(response.body).toHaveProperty('message')
//             expect(typeof response.body.message).toEqual('string')
//         })
//         test('POST /users/register failed because email is empty', async function(){
//             const response = await request(app)
//             .post('/users/register')
//             .send({username: "deaimut",password: "inidea",phoneNumber: "081122333"})

//             expect(response.status).toEqual(400)
//             expect(typeof response.body).toEqual('object')
//             expect(response.body).toHaveProperty('msg')
//             expect(typeof response.body.msg).toEqual('string')
//         })
//         test('POST /users/registerfailed because password is empty', async function(){
//             const response = await request(app)
//             .post('/users/register')
//             .send({username: "deaimut",email: "justin@gmail.com",password: hashPassword(""),phoneNumber: "081122333"})

//             expect(response.status).toEqual(400)
//             expect(typeof response.body).toEqual('object')
//             expect(response.body).toHaveProperty('msg')
//             expect(typeof response.body.msg).toEqual('string')
//         })
//         test('POST /users/register failed because email is required', async function(){
//             const response = await request(app)
//             .post('/users/register')
//             .send({username: "deaimut",email: "",password: "inidea",phoneNumber: "081122333"})

//             expect(response.status).toEqual(400)
//             expect(typeof response.body).toEqual('object')
//             expect(response.body).toHaveProperty('msg')
//             expect(typeof response.body.msg).toEqual('string')
//         })
//         test('POST /users/register failed because password is required', async function(){
//             const response = await request(app)
//             .post('/users/register')
//             .send({username: "deaimut",email: "justin@gmail.com",phoneNumber: "081122333"})

//             expect(response.status).toEqual(400)
//             expect(typeof response.body).toEqual('object')
//             expect(response.body).toHaveProperty('msg')
//             expect(typeof response.body.msg).toEqual('string')
//         })
//         test('POST /users/register failed because email must be unique', async function(){
//             const response = await request(app)
//             .post('/users/register')
//             .send({username: "deaimut",email: "justin@gmail.com",password: "inidea",phoneNumber: "081122333"})

//             expect(response.status).toEqual(400)
//             expect(typeof response.body).toEqual('object')
//             expect(response.body).toHaveProperty('msg', "email must be unique")
//             expect(typeof response.body.msg).toEqual('string')
//         })
//         test('POST /users/register failed because email format is incorrect', async function(){
//             const response = await request(app)
//             .post('/users/register')

//             .send({username: "deaimut",email: "justingmail.com",password: "inidea" ,phoneNumber: "081122333"})

//             expect(response.status).toEqual(400)
//             expect(typeof response.body).toEqual('object')
//             expect(response.body).toHaveProperty('msg', "Validation isEmail on email failed")
//             expect(typeof response.body.msg).toEqual('string')
//         })
//     })
//     describe('Login testing', function(){
//         test('POST /users/login success', async function(){
//             const response = await request(app)
//             .post('/users/login')
//             .send({email: "deacantik@gmail.com", password: "inidea"})

//             expect(response.status).toEqual(200)
//             console.log(response.body, "access tokennnnnn niii<<<<");
//             expect(typeof response.body).toEqual('object')
//             expect(typeof response.body.access_token).toEqual('string')
//             expect(typeof response.body.email).toEqual('string')
//         })
//         test('POST /users/login failed because wrong password input', async function(){
//             const response = await request(app)
//             .post('/users/login')
//             .send({email: "deacantik@gmail.com", password: "inidepp"})

//             expect(response.status).toEqual(401)
//             expect(typeof response.body).toEqual('object')
//             expect(response.body).toHaveProperty('message', "InvalidToken")
//             expect(typeof response.body.message).toEqual('string')
//         })
//         test('POST /users/login failed because wrong email input', async function(){
//             const response = await request(app)
//             .post('/users/login')
//             .send({email: "kambing@gmail.com", password: "inidea"})

//             expect(response.status).toEqual(401)
//             expect(typeof response.body).toEqual('object')
//             expect(response.body).toHaveProperty('message', "InvalidToken")
//             expect(typeof response.body.message).toEqual('string')
//         })
//     })
//     describe('User Order', function(){
//         test('POST /users/order success', async function(){
//             const response = await request(app)
//             .post('/users/order')
//             .set({
//                 access_token
//             })
//             .send({
//                 problem: "ban muter", lat: "-6.940669415817259",lng: "107.5925576773082", car: "BMW", carType: "sedan", license: "B 232 EE" 
//             })
//             console.log(access_token, "<<<<<<< access tokennn");
//             expect(response.status).toEqual(201)
//             console.log(response.body, "niii<<<<");
//             expect(typeof response.body).toEqual('object')
//             expect(response.body).toHaveProperty('message')
//             expect(typeof response.body.message).toEqual('string')
//         })
//         test('POST /users/order fail create because Problem is require', async function(){
//             const response = await request(app)
//             .post('/users/order')
//             .set({
//                 access_token
//             })
//             .send({
//                 problem: "", lat: "-6.940669415817259",lng: "107.5925576773082", car: "BMW", carType: "sedan", license: "B 232 EE" 
//             })
//             expect(response.status).toEqual(400)
//             expect(typeof response.body).toEqual('object')
//             expect(response.body).toHaveProperty('msg', "Problem is require")
//             expect(typeof response.body.msg).toEqual('string')
//         })
//         test('POST /users/order fail create because Car is require', async function(){
//             const response = await request(app)
//             .post('/users/order')
//             .set({
//                 access_token
//             })
//             .send({
//                 problem: "ban muter", lat: "-6.940669415817259",lng: "107.5925576773082", car: "", carType: "sedan", license: "B 232 EE" 
//             })
//             expect(response.status).toEqual(400)
//             expect(typeof response.body).toEqual('object')
//             expect(response.body).toHaveProperty('msg', "Car is require")
//             expect(typeof response.body.msg).toEqual('string')
//         })
//         test('POST /users/order fail create because Car is require', async function(){
//             const response = await request(app)
//             .post('/users/order')
//             .set({
//                 access_token
//             })
//             .send({
//                 problem: "ban muter", lat: "-6.940669415817259",lng: "107.5925576773082", car: "BMW", carType: "", license: "B 232 EE" 
//             })
//             expect(response.status).toEqual(400)
//             expect(typeof response.body).toEqual('object')
//             expect(response.body).toHaveProperty('msg', "car Type is require")
//             expect(typeof response.body.msg).toEqual('string')
//         })
//         test('POST /users/order fail create because License is require', async function(){
//             const response = await request(app)
//             .post('/users/order')
//             .set({
//                 access_token
//             })
//             .send({
//                 problem: "ban muter", lat: "-6.940669415817259",lng: "107.5925576773082", car: "BMW", carType: "bus", license: "" 
//             })
//             expect(response.status).toEqual(400)
//             expect(typeof response.body).toEqual('object')
//             expect(response.body).toHaveProperty('msg', "license is require")
//             expect(typeof response.body.msg).toEqual('string')
//         })
//     })
//     describe('User detail by id', function(){
//         test('GET /users/detail/:id success', async function(){
//             const response = await request(app)
//             .get('/users/detail/1')
//             .set({
//                 access_token
//             })
//             // .send({})

//             expect(response.status).toEqual(200)
//             expect(typeof response.body).toEqual('object')
//             console.log(response.body, "niii detail id<<<<");

//             // expect(response.body.id).toHaveProperty('string')
//             // expect(typeof response.body.message).toEqual('string')

//         })
//         test('GET /users/detail/:id failed because access token is invalid', async function(){
//             const response = await request(app)
//             .get('/users/detail/1')
//             .set({
//                 // access_token
//             })
//             // .send({})
//             expect(response.status).toEqual(401)
//             expect(typeof response.body).toEqual('object')
//             expect(response.body).toHaveProperty('message', "invalid token")
//             expect(typeof response.body.message).toEqual('string')
//             console.log(response.body.message, "<<message");
//         })
//     })
//     describe('User review by Id', function(){
//         test('POST /users/review/:id success', async function(){
//             const response = await request(app)
//             .post('/users/review/1')
//             .set({
//                 access_token
//             })

//             expect(response.status).toEqual(200)
//             expect(typeof response.body).toEqual('object')
//             expect(response.body).toHaveProperty('postReview')
//             expect(typeof response.body.postReview).toEqual("object")
//             expect(typeof response.body.postReview.id).toEqual('number')
//             expect(typeof response.body.postReview.userId).toEqual('number')
//             expect(typeof response.body.postReview.partnerId).toEqual('number')
//             expect(typeof response.body.postReview.review).toEqual('object')
//             expect(typeof response.body.postReview.rating).toEqual('object')
//             console.log(response.c, "<< post reveiw");
//         })
//         test('POST /users/review/:id failed because access token is invalid', async function(){
//             const response = await request(app)
//             .post('/users/review/1')
//             .set({
//                 // access_token
//             })
//             // .send({})
//             expect(response.status).toEqual(401)
//             expect(typeof response.body).toEqual('object')
//             expect(response.body).toHaveProperty('message', "invalid token")
//             expect(typeof response.body.message).toEqual('string')
//             console.log(response.body.message, "<<message");
//         })
//         test('GET /users/review/:id success', async function(){
//             const response = await request(app)
//             .get('/users/review/1')
//             .set({
//                 access_token
//             })
//             expect(response.status).toEqual(200)
//             expect(typeof response.body[0]).toEqual('object')
//             expect(typeof response.body[0].id).toEqual('number')
//             expect(typeof response.body[0].userId).toEqual('number')
//             expect(typeof response.body[0].partnerId).toEqual('number')
//             expect(typeof response.body[0].review).toEqual('object')
//             expect(typeof response.body[0].rating).toEqual('object')
//         })
//         test('GET /users/review/:id success', async function(){
//             const response = await request(app)
//             .get('/users/review/1')
//             .set({
//                 // access_token
//             })
//             expect(response.status).toEqual(401)
//             expect(typeof response.body).toEqual('object')
//             expect(response.body).toHaveProperty('message', "invalid token")
//             expect(typeof response.body.message).toEqual('string')
//         })
//     })

//     describe('User process transaction', function(){
//         test('POST /users/process-transaction success', async function(){
//             const response = await request(app)
//             .post('/users/process-transaction')
//             .set({
//                 access_token
//             })
            
//         })
//     })

// })
