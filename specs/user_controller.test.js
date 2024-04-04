const request = require('supertest')
const app = require('../index.js')
const { user } = require("../models/index.js");
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcxMjIyMDkzOX0.5QOhUCfqFaVHeoCLJY580181W9SxWL028qu01RU4WYs"

const newUserPayload = {
  email: "admin2@gmail.com",
  password:"12345678",
  role_id: 1
}
const updateUserPayload = {
  email: "admin22@gmail.com",
  password:"123456",
  role_id: 2
}

describe("Check authentication", () => {
  it('return error if token is invalid', async () => {
    const res = await request(app).get('/api/users/1').set('Authorization',  `Bearer d5s65fs6d5f6s54f65sdf65s4df6323d4564bg64av1asdf`)
    expect(res.status).toEqual(401)
    expect(res.body.message).toEqual('Unauthorized!')
  })

  it('return error if user not exists', async () => {
    const res = await request(app).post('/api/users/login').send({email: "test@test.test", password: "332132132"})
    expect(res.status).toEqual(401)
    expect(res.body.message).toEqual('User not found')
  })

  it('return error if password are invalid', async () => {
    const res = await request(app).post('/api/users/login').send({email: "admin@gmail.com", password: "332132132"})
    expect(res.status).toEqual(401)
    expect(res.body.message).toEqual('Invalid credentials')
  })

  it('return error if user is not active', async () => {
    const inactive_user = await user.findOne({where: {status: 'inactive'}});
    const res = await request(app).post('/api/users/login').send({email: inactive_user.email, password: '12345678'})
    expect(res.status).toEqual(401)
    expect(res.body.message).toEqual('sorry! you are status is inactive, Please contact with admin')
  })
})

describe("Success Users APIs", () => {
  it('should show all users', async () => {
    const res = await request(app).get('/api/users').set('Authorization',  `Bearer ${token}`)
    expect(res.status).toEqual(200)
    expect(res.body.count).toEqual(await user.count())
  })

  it('should show user by ID', async () => {
    const res = await request(app).get('/api/users/1').set('Authorization',  `Bearer ${token}`)
    expect(res.status).toEqual(200)
    expect(res.body.data.id).toEqual(1)
  })

  it('should create a new user', async () => {
    const res = await request(app).post('/api/users').send(newUserPayload)
    expect(res.status).toEqual(201)
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toEqual(newUserPayload.email)
  })

  it('should update a existing user', async () => {
    const res = await request(app).put('/api/users/12').send(updateUserPayload).set('Authorization',  `Bearer ${token}`)
    expect(res.status).toEqual(200)
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toEqual(updateUserPayload.email)
  })

  it('should delete a existing user', async () => {
    const res = await request(app).delete('/api/users/12').set('Authorization',  `Bearer ${token}`)
    expect(res.status).toEqual(200)
    expect(res.body.success).toBe(true);
  })
})
