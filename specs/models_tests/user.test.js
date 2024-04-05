
const request = require('supertest')
const userFactory = require("../../specs/factories/user");


describe("Check authentication", () => {
  it('return error if invalid attributes for user', async () => {
    const user1 = await userFactory();
    console.log('<--------------------->');
    console.log(user1);
    console.log('<--------------------->');
    expect(user1).rejects.toEqual(expect.any(Error));
  })
})

