const request = require('supertest')
const app = require('../../index.js')
const { subscription, plan, user } = require("../../models/index.js");
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcxMjIyMDkzOX0.5QOhUCfqFaVHeoCLJY580181W9SxWL028qu01RU4WYs"

var today = new Date();
// const user_data = user.findByPk(3);
// const plan_data = plan.findByPk(6);

const newSubscriptionPayload = {
  user_id: 1,
  plan_id: 1,
  activation_date: today,
  expired_date: today.setDate(today.getDate()+30),
  plan_price: "251.33",
}

const updateSubscriptionPayload = {
  user_id: 5,
  plan_id: 5,
  activation_date: today,
  expired_date: today.setDate(today.getDate()+10),
  plan_price: "360.00",
}

describe("Check authentication", () => {
  it('faild get subscriptions if token is invalid', async () => {
    const res = await request(app).get('/api/subscriptions').set('Authorization', `Bearer invalid token`)
    expect(res.status).toEqual(401)
    expect(res.body.message).toEqual('Unauthorized!')
  })
  it('faild get subscription bye id if token is invalid', async () => {
    const res = await request(app).get('/api/subscriptions/1').set('Authorization', `Bearer invalid token`)
    expect(res.status).toEqual(401)
  })
  it('faild create subscription if token is invalid', async () => {
    const res = await request(app).post('/api/subscriptions').send(newSubscriptionPayload).set('Authorization', `Bearer invalid token`)
    expect(res.status).toEqual(401)
  })
  it('faild update subscription if token is invalid', async () => {
    const res = await request(app).put('/api/subscriptions/11').send(updateSubscriptionPayload).set('Authorization', `Bearer invalid token`)
    expect(res.status).toEqual(401)
  })
  it('faild delete delete if token is invalid', async () => {
    const res = await request(app).delete('/api/subscriptions/11').set('Authorization', `Bearer invalid token`)
    expect(res.status).toEqual(401)
  })
})

// describe("Check role base access/ authorization", () => {
//   it('access denied for get subscriptions', async () => {
//     const res = await request(app).get('/api/subscriptions').set('Authorization', `Bearer ${token}`)
//     expect(res.status).toEqual(401)
//     expect(res.body.message).toEqual("sorry! You don't have a access for this action")
//   })
//   it('access denied for get subscription', async () => {
//     const res = await request(app).get('/api/subscriptions/1').set('Authorization', `Bearer ${token}`)
//     expect(res.status).toEqual(401)
//   })
//   it('access denied for create subscription', async () => {
//     const res = await request(app).post('/api/subscriptions').send(newSubscriptionPayload).set('Authorization', `Bearer ${token}`)
//     expect(res.status).toEqual(401)
//   })
//   it('access denied for update subscription', async () => {
//     const res = await request(app).put('/api/subscriptions/11').send(updateSubscriptionPayload).set('Authorization', `Bearer ${token}`)
//     expect(res.status).toEqual(401)
//   })
//   it('access denied for delete subscription', async () => {
//     const res = await request(app).delete('/api/subscriptions/11').set('Authorization', `Bearer ${token}`)
//     expect(res.status).toEqual(401)
//   })
// })

describe("Success Subscriptions APIs", () => {
  it('should show all subscriptions', async () => {
    const res = await request(app).get('/api/subscriptions').set('Authorization',  `Bearer ${token}`)
    expect(res.status).toEqual(200)
    expect(res.body.count).toEqual(await subscription.count())
  })

  it('should show subscription by ID', async () => {
    const res = await request(app).get('/api/subscriptions/1').set('Authorization',  `Bearer ${token}`)
    expect(res.status).toEqual(200)
    expect(res.body.data.id).toEqual(1)
  })

  it('should create a new subscription', async () => {
    const planData = await plan.findByPk(6)
    newSubscriptionPayload.user_id = await user.findByPk(3).id
    newSubscriptionPayload.plan_id = planData.id
    newSubscriptionPayload.plan_price = planData.price
    const res = await request(app).post('/api/subscriptions').send(newSubscriptionPayload).set('Authorization',  `Bearer ${token}`)
    expect(res.status).toEqual(201)
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toEqual(newSubscriptionPayload.email)
  })

  it('should update a existing subscription', async () => {
    const res = await request(app).put('/api/subscriptions/10').send(updateSubscriptionPayload).set('Authorization',  `Bearer ${token}`)
    expect(res.status).toEqual(200)
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toEqual(updateSubscriptionPayload.email)
  })

  it('should delete a existing subscription', async () => {
    const res = await request(app).delete('/api/subscriptions/10').set('Authorization',  `Bearer ${token}`)
    expect(res.status).toEqual(200)
    expect(res.body.success).toBe(true);
  })
})
