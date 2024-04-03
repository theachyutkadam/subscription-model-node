const { role, Sequelize } = require("./../models");
const Op = Sequelize.Op;
let self = {};

/**
* @description Get All Roles
* @type GET
* @path /api/roles
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.getAll = async (req, res) => { }

/**
* @description Create New Role
* @type POST
* @path /api/roles/
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.createRole = async (req, res) => { }

/**
* @description Get Single Role info by id
* @type GET
* @path /api/roles/:id
* @param {*} req
* @param {*} res
* @param {Number} — id — role id
* @returns JSON
*/
self.get = async (req, res) => { }

/**
* @description Update Role data
* @type PUT
* @path /api/roles/:id
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.updateRole = async (req, res) => { }

/**
* @description Delete role with the specified id in the request
* @type DELETE
* @path /api/roles/:id
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.delete = async (req, res) => { }

/**
* @description Delete all roles from the database
* @type DELETE
* @path /api/roles/:id
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.deleteAll = async (req, res) => { };

module.exports = self;

// create role funcation--------
self.createRole = async (req, res) => {
  // if (!req.body.name) {
  //   return res.status(400).send({
  //     success: false,
  //     message: "Content can not be empty!"
  //   });
  // }
  try {
    let data = await role.create(req.body);
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

// get all roles funcation--------
self.getAll = async (req, res) => {
  try {
    let data = await role.findAll({});
    return res.status(200).json({
      success: true,
      count: data.length,
      data: data
    })
  } catch (error) {
    returnError(res, error)
  }
}

// get single role by ID funcation--------
self.get = async (req, res) => {
  console.log("status", role.getAttributes().status.values);
  try {
    let id = req.params.id;
    let data = await role.findByPk(id);
    if (data)
      return res.status(200).json({
        success: true,
        data: data
      })
    else
      return res.status(400).json({
        success: false,
        error: "No such role present",
        data: []
      })
  } catch (error) {
    returnError(res, error)
  }
}

// update role by ID funcation--------
self.updateRole = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await role.update(req.body, {where: {id: id}});
    let updatedRole = await role.findByPk(id);
    if (data[0] === 0) {
      return res.status(200).json({
        success: false,
        error: "No role found with this id"
      })
    }
    return res.status(200).json({
      success: true,
      data: updatedRole,
      message: "Role update successfully"
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

// delete role by ID funcation--------
self.delete = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await role.destroy({
      where: {
        id: id
      }
    });
    console.log('role record--->', data);
    if (data === 1) {
      return res.status(200).json({
        success: true,
        message: `Role with id=${id} deleted`
      })
    }
    return res.status(200).json({
      success: false,
      message: `Role with id=${id} is not present.`
    })
  } catch (error) {
    return res.status(200).json({
      success: false,
      error: error
    })
  }
}

// delete all roles funcation--------
self.deleteAll = async (req, res) => {
  try {
    let data = await role.destroy({
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
