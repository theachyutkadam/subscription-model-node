const request = require('supertest')
const app = require('../index.js')
const { role } = require("../models/index.js");
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcxMjIyMDkzOX0.5QOhUCfqFaVHeoCLJY580181W9SxWL028qu01RU4WYs"

const newRolePayload = {
  name: "test role",
  status: "pending",
  description: "It's a official role",
}
const updateRolePayload = {
  name: "test update role",
  status: "active",
  description: "It's a official role but now updated",
}

describe("Check authentication", () => {
  it('faild get roles if token is invalid', async () => {
    const res = await request(app).get('/api/roles').set('Authorization', `Bearer invalid token`)
    expect(res.status).toEqual(401)
    expect(res.body.message).toEqual('Unauthorized!')
  })
  it('faild get role bye id if token is invalid', async () => {
    const res = await request(app).get('/api/roles/1').set('Authorization', `Bearer invalid token`)
    expect(res.status).toEqual(401)
  })
  it('faild create role if token is invalid', async () => {
    const res = await request(app).post('/api/roles').send(newRolePayload).set('Authorization', `Bearer invalid token`)
    expect(res.status).toEqual(401)
  })
  it('faild update role if token is invalid', async () => {
    const res = await request(app).put('/api/roles/11').send(updateRolePayload).set('Authorization', `Bearer invalid token`)
    expect(res.status).toEqual(401)
  })
  it('faild delete delete if token is invalid', async () => {
    const res = await request(app).delete('/api/roles/11').set('Authorization', `Bearer invalid token`)
    expect(res.status).toEqual(401)
  })


})

describe("Success Roles APIs", () => {
  it('should show all roles', async () => {
    const res = await request(app).get('/api/roles').set('Authorization',  `Bearer ${token}`)
    expect(res.status).toEqual(200)
    expect(res.body.count).toEqual(await role.count())
  })

  it('should show role by ID', async () => {
    const res = await request(app).get('/api/roles/1').set('Authorization',  `Bearer ${token}`)
    expect(res.status).toEqual(200)
    expect(res.body.data.id).toEqual(1)
  })

  it('should create a new role', async () => {
    const res = await request(app).post('/api/roles').send(newRolePayload).set('Authorization',  `Bearer ${token}`)
    expect(res.status).toEqual(201)
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toEqual(newRolePayload.email)
  })

  it('should update a existing role', async () => {
    const res = await request(app).put('/api/roles/3').send(updateRolePayload).set('Authorization',  `Bearer ${token}`)
    expect(res.status).toEqual(200)
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toEqual(updateRolePayload.email)
  })

  it('should delete a existing role', async () => {
    const res = await request(app).delete('/api/roles/3').set('Authorization',  `Bearer ${token}`)
    expect(res.status).toEqual(200)
    expect(res.body.success).toBe(true);
  })
})
