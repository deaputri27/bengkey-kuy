const { describe, test, expect } = require('@jest/globals')
const request = require('supertest')
const app = require('../app')
const models = require('../models')
const { hashPassword } = require('../helper/bcrypt')
const bulkInsertPartner = require('../helper/PartnerBulkInsert')
beforeAll(async function(){
return bulkInsertPartner()
})
afterAll(async function() {
    await models.sequelize.close()
})
describe('Partner testing', function () {
    describe('Register partner', function () {
        test('POST /partners/register success', async function () {
            const response = await request(app)
                .post('/partners/register')
                .send({  
                partnerName: "bengkel jaya",
                email: "juju@pro.com",
                password: hashPassword("rahasia"),
                phoneNumber: "0808080808",
                address: "Jl. Tamani"})

            console.log(response.body, "<<<<<<");
            expect(response.status).toEqual(201)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('message')
            expect(typeof response.body.message).toEqual('string')
        })
        test('POST /partners/register  failed because email is empty', async function(){
            const response = await request(app)
            .post('/partners/register ')
            .send({  
                partnerName: "bengkel jaya",
                password: hashPassword("rahasia"),
                phoneNumber: "0808080808",
                address: "Jl. Tamani"})

            expect(response.status).toEqual(400)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('msg')
            expect(typeof response.body.msg).toEqual('string')
        })
        test('POST /partners/register failed because password is empty', async function(){
            const response = await request(app)
            .post('/partners/register ')
            .send({  
                partnerName: "bengkel jaya",
                email: "juju@pro.com",
                phoneNumber: "0808080808",
                address: "Jl. Tamani"})

            expect(response.status).toEqual(400)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('msg')
            expect(typeof response.body.msg).toEqual('string')
        })
        test('POST /partners/register  failed because partnerName is required', async function(){
            const response = await request(app)
            .post('/partners/register ')
            .send({  
                partnerName: "",
                email: "",
                password: hashPassword("rahasia"),
                phoneNumber: "0808080808",
                address: "Jl. Tamani"})

            expect(response.status).toEqual(400)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('msg')
            expect(typeof response.body.msg).toEqual('string')
        })
        test('POST /partners/register  failed because email is required', async function(){
            const response = await request(app)
            .post('/partners/register ')
            .send({  
                partnerName: "bengkel jaya",
                email: "juju@pro.com",
                password: hashPassword("rahasia"),
                phoneNumber: "0808080808",
                address: "Jl. Tamani"})

            expect(response.status).toEqual(400)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('msg')
            expect(typeof response.body.msg).toEqual('string')
        })
        test('POST /partners/register  failed because password is required', async function(){
            const response = await request(app)
            .post('/partners/register ')
            .send({  
                partnerName: "bengkel jaya",
                email: "juju@pro.com",
                password: hashPassword(""),
                phoneNumber: "0808080808",
                address: "Jl. Tamani"})

            expect(response.status).toEqual(400)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('msg')
            expect(typeof response.body.msg).toEqual('string')
        })
        test('POST /partners/register  failed because phoneNumber is required', async function(){
            const response = await request(app)
            .post('/partners/register ')
            .send({  
                partnerName: "bengkel jaya",
                email: "juju@pro.com",
                password: hashPassword("rahasia"),
                phoneNumber: "",
                address: "Jl. Tamani"})

            expect(response.status).toEqual(400)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('msg')
            expect(typeof response.body.msg).toEqual('string')
        })
        test('POST /partners/register  failed because address is required', async function(){
            const response = await request(app)
            .post('/partners/register ')
            .send({  
                partnerName: "bengkel jaya",
                email: "juju@pro.com",
                password: hashPassword("rahasia"),
                phoneNumber: "0808080808",
                address: ""})

            expect(response.status).toEqual(400)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('msg')
            expect(typeof response.body.msg).toEqual('string')
        })
        test('POST /partners/register  failed because email must be unique', async function(){
            const response = await request(app)
            .post('/partners/register ')
            .send({  
                partnerName: "bengkel jaya",
                email: "juju@pro.com",
                password: hashPassword("rahasia"),
                phoneNumber: "0808080808",
                address: "Jl. Tamani"})

            expect(response.status).toEqual(400)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('msg', "email must be unique")
            expect(typeof response.body.msg).toEqual('string')
        })
        test('POST /partners/register  failed because email format is incorrect', async function(){
            const response = await request(app)
            .post('/partners/register ')
            .send({  
                partnerName: "bengkel jaya",
                email: "jujupro.com",
                password: hashPassword("rahasia"),
                phoneNumber: "0808080808",
                address: "Jl. Tamani"})

            expect(response.status).toEqual(400)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('msg', "Validation isEmail on email failed")
            expect(typeof response.body.msg).toEqual('string')
        })
        
    })
    describe('Login testing', function(){
        test('POST /partners/login success', async function(){
            const response = await request(app)
            .post('/partners/login')
            .send({
                email: "bengkel@pro.com",
                password: "rahasia",
            })

            expect(response.status).toEqual(200)
            console.log(response.body, "access tokennnnnn niii<<<<");
            expect(typeof response.body).toEqual('object')
            expect(typeof response.body.access_token).toEqual('string')
            expect(typeof response.body.email).toEqual('string')
        })
        test('POST /partners/login failed because wrong password input', async function(){
            const response = await request(app)
            .post('/partners/login')
            .send({
                email: "bengkel@pro.com",
                password: "rahasiahh",
            })
            expect(response.status).toEqual(401)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('message', "Invalid email/password")
            expect(typeof response.body.message).toEqual('string')
        })
        test('POST /partners/login failed because wrong email input', async function(){
            const response = await request(app)
            .post('/partners/login')
            .send({
                email: "bengkel1@pro.com",
                password: "rahasiahh",
            })
            expect(response.status).toEqual(401)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('message', "User not found")
            expect(typeof response.body.message).toEqual('string')
        })
    })
    describe('Create Order Detail', function(){
        test('POST /partners/products/:productId success', async function(){
            const response = await request(app)
            .post('/partners/products/:productId')
            .set({
                access_token
            })
        })
    })
})