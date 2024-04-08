const request = require('supertest')
const app = require('../../index.js')
const { user_information, user } = require("../../models/index.js");
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcxMjIyMDkzOX0.5QOhUCfqFaVHeoCLJY580181W9SxWL028qu01RU4WYs"
const {faker} = require('@faker-js/faker');

// const user_data = await user.findByPk(3);

const newUserInformationPayload = {
  user_id: 1,
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  contact: faker.number.int({ min: 1111111111, max: 9999999999 }),
  birth_date: faker.date.anytime(),
  maritial_status: 'single',
  gender: 'male',
}
const updateUserInformationPayload = {
  user_id: 5,
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  contact: faker.number.int({ min: 1111111111, max: 9999999999 }),
  birth_date: faker.date.anytime(),
  maritial_status: 'married',
  gender: 'female',
}

describe("Check authentication", () => {
  it('faild get user_informations if token is invalid', async () => {
    const res = await request(app).get('/api/user_informations').set('Authorization', `Bearer invalid token`)
    expect(res.status).toEqual(401)
    expect(res.body.message).toEqual('Unauthorized!')
  })
  it('faild get user_information bye id if token is invalid', async () => {
    const res = await request(app).get('/api/user_informations/1').set('Authorization', `Bearer invalid token`)
    expect(res.status).toEqual(401)
  })
  it('faild create user_information if token is invalid', async () => {
    const res = await request(app).post('/api/user_informations').send(newUserInformationPayload).set('Authorization', `Bearer invalid token`)
    expect(res.status).toEqual(401)
  })
  it('faild update user_information if token is invalid', async () => {
    const res = await request(app).put('/api/user_informations/11').send(updateUserInformationPayload).set('Authorization', `Bearer invalid token`)
    expect(res.status).toEqual(401)
  })
  it('faild delete delete if token is invalid', async () => {
    const res = await request(app).delete('/api/user_informations/11').set('Authorization', `Bearer invalid token`)
    expect(res.status).toEqual(401)
  })


})

describe("Success UserInformations APIs", () => {
  it('should show all user_informations', async () => {
    const res = await request(app).get('/api/user_informations').set('Authorization',  `Bearer ${token}`)
    expect(res.status).toEqual(200)
    expect(res.body.count).toEqual(await user_information.count())
  })

  it('should show user_information by ID', async () => {
    const res = await request(app).get('/api/user_informations/1').set('Authorization',  `Bearer ${token}`)
    expect(res.status).toEqual(200)
    expect(res.body.data.id).toEqual(1)
  })

  it('should create a new user_information', async () => {
    newUserInformationPayload.user_id = await user.findByPk(3).id
    const res = await request(app).post('/api/user_informations').send(newUserInformationPayload).set('Authorization',  `Bearer ${token}`)
    expect(res.status).toEqual(201)
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toEqual(newUserInformationPayload.email)
  })

  it('should update a existing user_information', async () => {
    const res = await request(app).put('/api/user_informations/10').send(updateUserInformationPayload).set('Authorization',  `Bearer ${token}`)
    expect(res.status).toEqual(200)
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toEqual(updateUserInformationPayload.email)
  })

  it('should delete a existing user_information', async () => {
    const res = await request(app).delete('/api/user_informations/10').set('Authorization',  `Bearer ${token}`)
    expect(res.status).toEqual(200)
    expect(res.body.success).toBe(true);
  })
})
