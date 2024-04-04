const request = require('supertest')
const app = require('../index.js')
const { Authorization } = require("../models/index.js");
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcxMjIyMDkzOX0.5QOhUCfqFaVHeoCLJY580181W9SxWL028qu01RU4WYs"

const newAuthorizationPayload = {
  path: "users",
  role_id: 2,
  can_read: true,
  can_write: false,
  can_update: false,
  can_delete: false
}

const updateAuthorizationPayload = {
  path: "users",
  role_id: 1,
  can_read: true,
  can_write: true,
  can_update: true,
  can_delete: true
}

describe("Check authentication", () => {
  it('faild get authorizations if token is invalid', async () => {
    const res = await request(app).get('/api/authorizations').set('Authorization', `Bearer invalid token`)
    expect(res.status).toEqual(401)
    expect(res.body.message).toEqual('Unauthorized!')
  })
  it('faild get authorization bye id if token is invalid', async () => {
    const res = await request(app).get('/api/authorizations/1').set('Authorization', `Bearer invalid token`)
    expect(res.status).toEqual(401)
  })
  it('faild create authorization if token is invalid', async () => {
    const res = await request(app).post('/api/authorizations').send(newAuthorizationPayload).set('Authorization', `Bearer invalid token`)
    expect(res.status).toEqual(401)
  })
  it('faild update authorization if token is invalid', async () => {
    const res = await request(app).put('/api/authorizations/11').send(updateAuthorizationPayload).set('Authorization', `Bearer invalid token`)
    expect(res.status).toEqual(401)
  })
  it('faild delete delete if token is invalid', async () => {
    const res = await request(app).delete('/api/authorizations/11').set('Authorization', `Bearer invalid token`)
    expect(res.status).toEqual(401)
  })


})

describe("Success Authorizations APIs", () => {
  it('should show all authorizations', async () => {
    const res = await request(app).get('/api/authorizations').set('Authorization',  `Bearer ${token}`)
    expect(res.status).toEqual(200)
    expect(res.body.count).toEqual(await Authorization.count())
  })

  it('should show authorization by ID', async () => {
    const res = await request(app).get('/api/authorizations/1').set('Authorization',  `Bearer ${token}`)
    expect(res.status).toEqual(200)
    expect(res.body.data.id).toEqual(1)
  })

  it('should create a new authorization', async () => {
    const res = await request(app).post('/api/authorizations').send(newAuthorizationPayload).set('Authorization',  `Bearer ${token}`)
    expect(res.status).toEqual(201)
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toEqual(newAuthorizationPayload.email)
  })

  it('should update a existing authorization', async () => {
    const res = await request(app).put('/api/authorizations/10').send(updateAuthorizationPayload).set('Authorization',  `Bearer ${token}`)
    expect(res.status).toEqual(200)
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toEqual(updateAuthorizationPayload.email)
  })

  it('should delete a existing authorization', async () => {
    const res = await request(app).delete('/api/authorizations/10').set('Authorization',  `Bearer ${token}`)
    expect(res.status).toEqual(200)
    expect(res.body.success).toBe(true);
  })
})
