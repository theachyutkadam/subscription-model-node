const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { user, Sequelize } = require("./../models");
const Op = Sequelize.Op;
let self = {};

/**
* @description Get All Users
* @type GET
* @path /api/users
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.getAll = async (req, res) => { }

/**
 * @description Authentication process with username and password
 * @type GET
 * @path /api/users/login
 * @param {*} req
 * @param {*} res
 * @returns JSON
*/
self.loginUser = async (req, res) => { }

/**
* @description Create New User
* @type POST
* @path /api/users/
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.createUser = async (req, res) => { }

/**
* @description Get Single User info by id
* @type GET
* @path /api/users/
* @param {*} req
* @param {*} res
* @param {Number} — id — user id
* @returns JSON
*/
self.get = async (req, res) => { }

/**
* @description Update User data
* @type PUT
* @path /api/users/:id
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.updateUser = async (req, res) => { }

/**
* @description Delete user with the specified id in the request
* @type DELETE
* @path /api/users/:id
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.delete = async (req, res) => { }

/**
* @description Delete all users from the database
* @type DELETE
* @path /api/users/:id
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.deleteAll = async (req, res) => { };

module.exports = self;

// create user funcation--------
self.logiUser = async (req, res) => {
  console.log('Check-auth lgoin method-->', req.body);
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({
      success: false,
      message: "Content can not be empty!"
    });
  }
  try {
    const user_data = await user.findOne({where: {email: req.body.email}});
    if(!user_data){
      res.status(401).json({ message: 'User not found' });
    }else if (await bcrypt.compare(req.body.password, user['password'])) {
      const tokenPayload = {email: user['email']};
      res.json(
        {
          status: 'success',
          message: 'User Logged In!',
          token: jwt.sign(tokenPayload, 'SECRET')
        }
      );
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// create user funcation--------
self.createUser = async (req, res) => {
  console.log('Check-create method-->', req.body);
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({
      success: false,
      message: "Content can not be empty!"
    });
  }
  try {
    const newUser = {
      email: req.body.email,
      role_id: req.body.role_id,
      password: await bcrypt.hash(req.body.password, 12),
    };
    let data = await user.create(newUser);
    return res.status(201).json({
      success: true,
      data: data
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error
    })
  }
}

// get all users funcation--------
self.getAll = async (req, res) => {
  try {
    console.log('Check--return association->');
    let data = await user.findAll({
      // include: [
      //   {
      //     model: Roles,
      //   }
      // ],
    });
    console.log('Check--response data->', data);
    return res.status(200).json({
      success: true,
      count: data.length,
      data: data
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error
    })
  }
}

// get single user by ID funcation--------
self.get = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await user.findByPk(id);
    if (data)
      return res.status(200).json({
        success: true,
        data: data
      })
    else
      return res.status(400).json({
        success: false,
        error: "No such user present",
        data: []
      })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error
    })
  }
}

// update user by ID funcation--------
self.updateUser = async (req, res) => {
  try {
    let id = req.params.id;
    const user_payload = {
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 12),
    };
    let data = await user.update(user_payload, {where: {id: id}});
    let updatedUser = await user.findByPk(id, {attributes: ['id', 'email', "role_id"]});
    if (data[0] === 0) {
      return res.status(200).json({
        success: false,
        error: "No user found with this id"
      })
    }
    return res.status(200).json({
      success: true,
      data: updatedUser,
      message: "User update successfully"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error
    })
  }
}

// delete user by ID funcation--------
self.delete = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await user.destroy({
      where: {
        id: id
      }
    });
    if (data === 1) {
      return res.status(200).json({
        success: true,
        message: `User with id=${id} deleted`
      })
    }
    return res.status(200).json({
      success: false,
      message: `User with id=${id} is not present.`
    })
  } catch (error) {
    return res.status(200).json({
      success: false,
      error: error
    })
  }
}

// delete all users funcation--------
self.deleteAll = async (req, res) => {
  try {
    let data = await user.destroy({
      where: {},
      truncate: true
    });
    return res.status(200).json({
      success: true,
      data: data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error
    })
  }
};
