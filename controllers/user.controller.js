require('dotenv').config()

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
// const email_credentials = require(__dirname + '/../config/config.json')['auth'];
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
 * @type POST
 * @path /api/users/login
 * @param {*} req
 * @param {*} res
 * @returns JSON
*/
self.loginUser = async (req, res) => { }

/**
 * @description Update user password
 * @type POST
 * @path /api/users/update_password
 * @param {*} req
 * @param {*} res
 * @returns JSON
*/
self.updatePassword = async (req, res) => { }

/**
* @description Send a email for update passowrd with forgot password link
* @type POST
* @path /api/users/forgot_password
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.sendForgotPasswordLink = async (req, res) => { }

/**
 * @description Activation process with encrypted email token
 * @type GET
 * @path /api/users/activation
 * @param {*} req
 * @param {*} res
 * @param {Number} — token — user token
 * @returns JSON
*/
self.activateUser = async (req, res) => { }

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
    returnTrueResponse(res, 400, false, "Content can not be empty!")
  }
  try {
    const user_data = await user.findOne({where: {email: req.body.email}});
    if(!user_data){
      returnTrueResponse(res, 401, false, 'User not found')
    }else if (user_data.status != "active") {
      returnTrueResponse(res, 401, false, `sorry! you are status is ${user_data.status}, Please contact with admin`)

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
      returnTrueResponse(res, 401, false, 'Invalid credentials')
    }
  } catch (error) {
    returnTrueResponse(res, 500, false, error.message)
  }
}

// create user funcation--------
self.createUser = async (req, res) => {
  try {
    req.body.password = req.body.password ? await bcrypt.hash(req.body.password, 12) : ''
    let user_object = await user.create(req.body);
    const mailPayload = await create_user_email_payload(req.body.email)

    setup_transporter_details().sendMail(mailPayload, function (err, info) {
      err ? returnFalseResponse(res, false, err) : console.log('mail info', info)
      return res.status(201).json({
        success: true,
        data: user_object,
        message_id: info.messageId
      })
    });
  } catch (error) {
    if (error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
      const error_messages = error.errors.map(err => err.message)
      returnTrueResponse(res, 500, false, error_messages)
    } else {
      returnFalseResponse(res, false, error)
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
    returnFalseResponse(res, false, error)
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
    returnTrueResponse(res, 400, false, "No such user present")
  } catch (error) {
    returnFalseResponse(res, false, error)
  }
}

// update user by ID funcation--------
self.updateUser = async (req, res) => {
  try {
    let id = req.params.id;
    req.body.password = await bcrypt.hash(req.body.password, 12)

    // const user_payload = {
    //   email: req.body.email,
    //   password: await bcrypt.hash(req.body.password, 12),
    // };
    let data = await user.update(req.body, {where: {id: id}});
    let updatedUser = await user.findByPk(id, {
      include: {model: models.role, required: true},
      attributes: ['id', 'email', "role_id"]
    });
    if (data[0] === 0) {
      returnTrueResponse(res, 200, false, "No user found with this id")
    }
    return res.status(200).json({
      success: true,
      data: updatedUser,
      message: "User update successfully"
    })
  } catch (error) {
    if (error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
      const error_messages = error.errors.map(err => err.message)
      returnTrueResponse(res, 500, false, error_messages)
    } else {
      returnFalseResponse(res, false, error)
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
      returnTrueResponse(res, 200, false, `User with id=${id} is not present.`)
    }
  } catch (error) {
    returnFalseResponse(res, false, error)
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
    returnFalseResponse(res, false, error)
  }
}

self.sendForgotPasswordLink = async(req, res) => {
  const user_data = await user.findOne({where: {email: req.body.email}});
  if(!user_data){
    return res.status(401).json({ message: 'User not found' });
  } else {
    const mailPayload = await forgot_password_payload(req.body.email)
    setup_transporter_details().sendMail(mailPayload, function (err, info) {
      err ? returnFalseResponse(res, false, err) : console.log('mail info', info)
      return res.status(201).json({
        success: true,
        message: `Forgot password email send on ${req.body.email} Please check your email.`,
        message_id: info.messageId
      })
    });
  }
}

self.activateUser = async(req, res) => {
  try {
    let email = jwt.verify(req.params.token, 'SECRET')
    let user_object = await user.findOne({where: {email: email}});
    if (user_object.status == 'active'){
      returnTrueResponse(res, 200, true, "User already activated")
    }
    let activated_data = await user.update({status: 'active'}, {where: {email: email}});

    if (!activated_data[0] == 0) {
      returnTrueResponse(res, 200, true, "User activated successfully")
    }
  } catch (error) {
    returnFalseResponse(res, false, error)
  }
}

self.updatePassword = async(req, res) => {
  try {
    let email = jwt.verify(req.params.token, 'SECRET')
    let new_password = req.body.new_password
    let activated_data = await user.update({password: new_password}, {where: {email: email}});

    if (!activated_data[0] == 0) {
      returnTrueResponse(res, 200, true, "User password update successfully")
    }
  } catch (error) {
    returnFalseResponse(res, false, error)
  }
}

function returnFalseResponse(res, is_sucess, error) {
  res.status(500).json({
    success: is_sucess,
    error: error
  })
}

function returnTrueResponse(res, status_code, is_sucess, message) {
  return res.status(status_code).json({
    success: is_sucess,
    message: message
  })
}

async function create_user_email_payload(email) {
  link = `http://localhost:${process.env.PORT}/api/users/activation/${jwt.sign(email, 'SECRET')}`
  mailPayload = {
    from: 'Subscription App<achyutkadam27@gmail.com>',
    to: email,
    subject: 'Welcome, for onboarding process',
    text: `Hello ${email} welcome to subscription module application, we are check your details as soon as possible.`,
    html: `<b>Hey there! </b><br>Hello ${email} welcome to subscription module application, <a href=${link}>Click here to activate your account</a>.<br/> ${new Date()}`
  }
  return mailPayload
}

async function forgot_password_payload(email) {
  link = `http://localhost:${process.env.PORT}/api/users/update_password/${jwt.sign(email, 'SECRET')}`
  mailPayload = {
    from: process.env.FROM_EMAIL,
    to: email,
    subject: 'Forgot password link',
    text: `Hello ${email} welcome to subscription module application, we are check your details as soon as possible.`,
    html: `<b>Hey there! </b><br>Hello ${email} update your password usign<a href=${link}> this link</a>.<br/> ${new Date()}`
  }
  return mailPayload
}

function setup_transporter_details() {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS
    },
    secure: true
  });
  return transporter
}
