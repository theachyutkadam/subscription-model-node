const { user_information, Sequelize } = require("./../models");
const models = require('./../models');
const Op = Sequelize.Op;
let self = {};

/**
* @description Get All UserInformations
* @type GET
* @path /api/user_informations
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.getAll = async (req, res) => { }

/**
* @description Create New UserInformation
* @type POST
* @path /api/user_informations/
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.createUserInformation = async (req, res) => { }

/**
* @description Get Single UserInformation info by id
* @type GET
* @path /api/user_informations/:id
* @param {*} req
* @param {*} res
* @param {Number} — id — user_information id
* @returns JSON
*/
self.get = async (req, res) => { }

/**
* @description Update UserInformation data
* @type PUT
* @path /api/user_informations/:id
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.updateUserInformation = async (req, res) => { }

/**
* @description Delete user_information with the specified id in the request
* @type DELETE
* @path /api/user_informations/:id
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.delete = async (req, res) => { }

/**
* @description Delete all user_informations from the database
* @type DELETE
* @path /api/user_informations/:id
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.deleteAll = async (req, res) => { };

module.exports = self;

// create user_information funcation--------
self.createUserInformation = async (req, res) => {
  // if (!req.body.name) {
  //   return res.status(400).send({
  //     success: false,
  //     message: "Content can not be empty!"
  //   });
  // }
  try {
    let data = await user_information.create(req.body);
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

// get all user_informations funcation--------
self.getAll = async (req, res) => {
  console.log('Check---user_information>');
  try {
    let data = await user_information.findAll({
      include: [{model: models.user, required: true}]
    });
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

// get single user_information by ID funcation--------
self.get = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await user_information.findByPk(id, {
      include: [
        {model: models.user, required: true}
      ]
    });
    if (data)
      return res.status(200).json({
        success: true,
        data: data
      })
    else
      return res.status(400).json({
        success: false,
        error: "No such user_information present",
        data: []
      })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error
    })
  }
}

// update user_information by ID funcation--------
self.updateUserInformation = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await user_information.update(req.body, {where: {id: id}});
    let updatedUserInformation = await user_information.findByPk(id, {
      include: [{model: models.user, required: true}]
    });
    if (data[0] === 0) {
      return res.status(200).json({
        success: false,
        error: "No user_information found with this id"
      })
    }
    return res.status(200).json({
      success: true,
      data: updatedUserInformation,
      message: "UserInformation update successfully"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error
    })
  }
}

// delete user_information by ID funcation--------
self.delete = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await user_information.destroy({
      where: {
        id: id
      }
    });
    console.log('user_information record--->', data);
    if (data === 1) {
      return res.status(200).json({
        success: true,
        message: `UserInformation with id=${id} deleted`
      })
    }
    return res.status(200).json({
      success: false,
      message: `UserInformation with id=${id} is not present.`
    })
  } catch (error) {
    return res.status(200).json({
      success: false,
      error: error
    })
  }
}

// delete all user_informations funcation--------
self.deleteAll = async (req, res) => {
  try {
    let data = await user_information.destroy({
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
