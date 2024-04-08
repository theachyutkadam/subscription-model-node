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
    const roleObject = role.create(invalidRolePayload)
    await expect(roleObject).rejects.toEqual(expect.any(Error));
    console.log('<---Check--->');
    console.log('Check--->', roleObject);
    console.log('<---Check--->');
  })
})

