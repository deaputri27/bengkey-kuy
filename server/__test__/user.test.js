const { describe, test, expect } = require('@jest/globals')
const request = require('supertest')
const app = require('../app')
const models = require('../models')
const bulkInsertCust = require('../helper/UserBulkInsert')
const {hashPassword} = require('../helper/bcrypt')
// const models = require('../models')
beforeAll(async function(){
    await bulkInsertCust()
})
afterAll(async function() {
    await models.sequelize.close()
})
describe('User testing', function(){
    describe('Register user', function(){
        test('POST /users/register success', async function(){
            const response = await request(app)
            .post('/users/register')
            .send({username: "deaimut",email: "justin@gmail.com",password: hashPassword("inidea"),phoneNumber: "081122333"})

            console.log(response.body, "<<<<<<");
            expect(response.status).toEqual(201)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('message')
            expect(typeof response.body.message).toEqual('string')
        })
        test('POST /users/register failed because email is empty', async function(){
            const response = await request(app)
            .post('/users/register')
            .send({email: "", password: "inidea"})

            expect(response.status).toEqual(400)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('msg')
            expect(typeof response.body.msg).toEqual('string')
        })
        test('POST /users/registerfailed because password is empty', async function(){
            const response = await request(app)
            .post('/users/register')
            .send({email: "dea@gmail.com", password: ""})

            expect(response.status).toEqual(400)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('msg')
            expect(typeof response.body.msg).toEqual('string')
        })
        test('POST /users/register failed because email is required', async function(){
            const response = await request(app)
            .post('/users/register')
            .send({password: "122334"})

            expect(response.status).toEqual(400)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('msg')
            expect(typeof response.body.msg).toEqual('string')
        })
        test('POST /users/register failed because password is required', async function(){
            const response = await request(app)
            .post('/users/register')
            .send({email: "dea@gmail.com"})

            expect(response.status).toEqual(400)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('msg')
            expect(typeof response.body.msg).toEqual('string')
        })
        test('POST /users/register failed because email must be unique', async function(){
            const response = await request(app)
            .post('/users/register')
            .send({email: "deacantik@gmail.com", password: "inidea"})

            expect(response.status).toEqual(400)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('msg', "email must be unique")
            expect(typeof response.body.msg).toEqual('string')
        })
        test('POST /users/register failed because email format is incorrect', async function(){
            const response = await request(app)
            .post('/users/register')
            .send({email: "deacantikgmail.com", password: "inidea"})

            expect(response.status).toEqual(400)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('msg', "email format is incorrect")
            expect(typeof response.body.msg).toEqual('string')
        })
    })
})