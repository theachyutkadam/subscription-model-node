const request = require('supertest')
// const app = require('../../index.js')
const { role } = require("../../models/index.js");

const validRolePayload = {
  name: "test role",
  status: "pending",
  description: "It's a official role",
}
const invalidRolePayload = {
  name: "",
  status: "invalid",
  description: "this is invalid object",
}

describe("Check authentication", () => {
  it('return error if invalid attributes for role', async () => {
    const roleObject = await role.create(invalidRolePayload)
    console.log('<--------------------->');
    console.log(roleObject);
    console.log('<--------------------->');
    expect(roleObject).rejects.toEqual(expect.any(Error));
  })
})

