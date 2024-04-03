const { Authorization, Sequelize } = require("../models");
const Op = Sequelize.Op;
let self = {};

/**
* @description Get All Authorizations
* @type GET
* @path /api/authorizations
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.getAll = async (req, res) => { }

/**
* @description Create New Authorization
* @type POST
* @path /api/authorizations/
* @param {*} req
* @param {*} res
* @returns JSON
*/

self.createAuthorization = async (req, res) => { }
/**
* @description Get Single Authorization info by id
* @type GET
* @path /api/authorizations/:id
* @param {*} req
* @param {*} res
* @param {Number} — id — authorization id
* @returns JSON
*/

self.get = async (req, res) => { }
/**
* @description Update Authorization data
* @type PUT
* @path /api/authorizations/:id
* @param {*} req
* @param {*} res
* @returns JSON
*/

self.updateAuthorization = async (req, res) => { }
/**
* @description Delete authorization with the specified id in the request
* @type DELETE
* @path /api/authorizations/:id
* @param {*} req
* @param {*} res
* @returns JSON
*/

self.delete = async (req, res) => { }
/**
* @description Delete all authorizations from the database
* @type DELETE
* @path /api/authorizations/:id
* @param {*} req
* @param {*} res
* @returns JSON
*/

self.deleteAll = async (req, res) => { };
module.exports = self;

// create authorization funcation--------
self.createAuthorization = async (req, res) => {
  try {
    let data = await Authorization.create(req.body);
    return res.status(201).json({
      success: true,
      data: data
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

// get all authorizations funcation--------
self.getAll = async (req, res) => {
  try {
    let data = await Authorization.findAll({});
    return res.status(200).json({
      success: true,
      count: data.length,
      data: data
    })
  } catch (error) {
    returnError(res, error)
  }
}

// get single authorization by ID funcation--------
self.get = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await Authorization.findByPk(id);
    if (data)
      return res.status(200).json({
        success: true,
        data: data
      })
    else
      return res.status(400).json({
        success: false,
        error: "No such authorization present",
        data: []
      })
  } catch (error) {
    returnError(res, error)
  }
}

// update authorization by ID funcation--------
self.updateAuthorization = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await Authorization.update(req.body, {where: {id: id}});
    let updatedAuthorization = await Authorization.findByPk(id);
    if (data[0] === 0) {
      return res.status(200).json({
        success: false,
        error: "No authorization found with this id"
      })
    }
    return res.status(200).json({
      success: true,
      data: updatedAuthorization,
      message: "Authorization update successfully"
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

// delete authorization by ID funcation--------
self.delete = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await Authorization.destroy({
      where: {
        id: id
      }
    });
    console.log('authorization record--->', data);
    if (data === 1) {
      return res.status(200).json({
        success: true,
        message: `Authorization with id=${id} deleted`
      })
    }
    return res.status(200).json({
      success: false,
      message: `Authorization with id=${id} is not present.`
    })
  } catch (error) {
    return res.status(200).json({
      success: false,
      error: error
    })
  }
}

// delete all authorizations funcation--------
self.deleteAll = async (req, res) => {
  try {
    let data = await Authorization.destroy({
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
};

function returnError(res, error) {
  res.status(500).json({
    success: false,
    error: error
  })
}
