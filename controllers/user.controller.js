const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const email_credentials = require(__dirname + '/../config/config.json')['auth'];
const { user, Sequelize } = require("./../models");
const models = require('./../models');

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
self.loginUser = async (req, res) => {
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
    }else if (user_data.status != "active") {
      res.status(401).json({
        message: `sorry! you are status is ${user_data.status}, Please contact with admin`
      });
    }else if (await bcrypt.compare(req.body.password, user_data['password'])) {
      const tokenPayload = {email: user_data['email']};
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
  try {
    req.body.password = req.body.password ? await bcrypt.hash(req.body.password, 12) : ''
    let user_object = await user.create(req.body);
    await send_activation_email(req.body.email)
    return res.status(201).json({
      success: true,
      data: user_object,
      // message_id: message_id
    })
  } catch (error) {
    console.log('Check--error->', error);
    if (error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
      const error_messages = error.errors.map(err => err.message)
      return res.status(500).json({error_messages})
    } else {
      returnError(res, error)
    }
  }
}

// get all users funcation--------
self.getAll = async (req, res) => {
  try {
    let data = await user.findAll({
      include: [{model: models.role, required: true}]
    });
    return res.status(200).json({
      success: true,
      count: data.length,
      data: data
    })
  } catch (error) {
    returnError(res, error)
  }
}

// get single user by ID funcation--------
self.get = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await user.findByPk(id, {
      include: [{model: models.role, required: true}]
    });
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
    returnError(res, error)
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
    let updatedUser = await user.findByPk(id, {
      include: {model: models.role, required: true},
      attributes: ['id', 'email', "role_id"]
    });
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
    if (error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
      const error_messages = error.errors.map(err => err.message)
      return res.status(500).json({error_messages})
    } else {
      returnError(res, error)
    }
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
    } else {
      return res.status(200).json({
        success: false,
        message: `User with id=${id} is not present.`
      })
    }
  } catch (error) {
    returnError(res, error)
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
    returnError(res, error)
  }
}

self.errorMessage = async(status, email) => {
  switch (status) {
    case 'inactive':
      `sorry! ${email} your status is ${status}, Please contact with admin`
      break;
    case 'deleted':
      `Hello ${email} your a ${status} user, create new account`
      break;
    case 'pending':
      `Hey your status is ${status}, Admin will check as soon as posible`
  }
};

function returnError(res, error) {
  res.status(500).json({
    success: false,
    error: error
  })
}

function send_activation_email(email) {
  const mailPayload = {
    from: 'youremail@gmail.com',
    to: email,
    subject: 'Welcome, for onboarding process',
    text: `Hello ${email} welcome to subscription module application, we are check your details as soon as possible.`,
    html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
  }
  // transporter.sendMail(mailPayload, function (err, info) {
  //   err ? console.log(err) : console.log(info)
  // });
  create_transporter().sendMail(mailPayload, function (err, info) {
    err ? console.log('mail errror', err) : console.log('mail info', info)
    return info.messageId
  });
}

function create_transporter() {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
      user: email_credentials.email,
      pass: email_credentials.pass
    },
    secure: true
  });
  console.log('Check-email-->', email_credentials.email);
  return transporter
}
