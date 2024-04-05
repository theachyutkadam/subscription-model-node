
const faker = require('@faker-js/faker');
const models = require('./../models');
/**
 * Generate an object which container attributes needed
 * to successfully create a user instance.
 *
 * @param  {Object} props Properties to use for the user.
 *
 * @return {Object} An object to build the user from.
 */

const data = async (props = {}) => {
  const defaultProps = {
    email: faker.internet.email(),
    password: "$2a$12$C1ysEDbeAPLvic86kF6k6O3di0U947zF8aVEkpClP1MjyuHT.ZQFq",
    role_id: await models.role.findOne({where: {status: "active"}})
  };
  return Object.assign({}, defaultProps, props);
};

/**
 * Generates a user instance from the properties provided.
 *
 * @param  {Object} props Properties to use for the user.
 *
 * @return {Object}       A user instance
 */

export default async (props = {}) =>
  models.user.create(await data(props));
