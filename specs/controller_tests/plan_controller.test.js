const request = require('supertest')
const app = require('../../index.js')
const { plan } = require("../../models/index.js");
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcxMjIyMDkzOX0.5QOhUCfqFaVHeoCLJY580181W9SxWL028qu01RU4WYs"

var today = new Date();

const newPlanPayload = {
  name: "test cases",
  price: "151.25",
  is_active: false,
  expire_at: today.setDate(today.getDate()+3),
  type: "monthly",
  description: "It's a official plan",
}
const updatePlanPayload = {
  name: "test cases plan for update",
  price: "251.51",
  is_active: true,
  expire_at: today.setDate(today.getDate()+10),
  type: "monthly",
  description: "It's a official plan and now it;s updated plan",
}

describe("Check authentication", () => {
  it('faild get plans if token is invalid', async () => {
    const res = await request(app).get('/api/plans').set('Authorization', `Bearer invalid token`)
    expect(res.status).toEqual(401)
    expect(res.body.message).toEqual('Unauthorized!')
  })
  it('faild get plan bye id if token is invalid', async () => {
    const res = await request(app).get('/api/plans/1').set('Authorization', `Bearer invalid token`)
    expect(res.status).toEqual(401)
  })
  it('faild create plan if token is invalid', async () => {
    const res = await request(app).post('/api/plans').send(newPlanPayload).set('Authorization', `Bearer invalid token`)
    expect(res.status).toEqual(401)
  })
  it('faild update plan if token is invalid', async () => {
    const res = await request(app).put('/api/plans/11').send(updatePlanPayload).set('Authorization', `Bearer invalid token`)
    expect(res.status).toEqual(401)
  })
  it('faild delete delete if token is invalid', async () => {
    const res = await request(app).delete('/api/plans/11').set('Authorization', `Bearer invalid token`)
    expect(res.status).toEqual(401)
  })


})

describe("Success Plans APIs", () => {
  it('should show all plans', async () => {
    const res = await request(app).get('/api/plans').set('Authorization',  `Bearer ${token}`)
    expect(res.status).toEqual(200)
    expect(res.body.count).toEqual(await plan.count())
  })

  it('should show plan by ID', async () => {
    const res = await request(app).get('/api/plans/1').set('Authorization',  `Bearer ${token}`)
    expect(res.status).toEqual(200)
    expect(res.body.data.id).toEqual(1)
  })

  it('should create a new plan', async () => {
    const res = await request(app).post('/api/plans').send(newPlanPayload).set('Authorization',  `Bearer ${token}`)
    expect(res.status).toEqual(201)
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toEqual(newPlanPayload.email)
  })

  it('should update a existing plan', async () => {
    const res = await request(app).put('/api/plans/10').send(updatePlanPayload).set('Authorization',  `Bearer ${token}`)
    expect(res.status).toEqual(200)
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toEqual(updatePlanPayload.email)
  })

  it('should delete a existing plan', async () => {
    const res = await request(app).delete('/api/plans/10').set('Authorization',  `Bearer ${token}`)
    expect(res.status).toEqual(200)
    expect(res.body.success).toBe(true);
  })
})
