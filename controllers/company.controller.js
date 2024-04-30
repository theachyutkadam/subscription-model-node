const { Company, Sequelize } = require("../models");
const Op = Sequelize.Op;
let self = {};

/**
* @description Get All Companies
* @type GET
* @path /api/companies
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.getAll = async (req, res) => { }

/**
* @description Create New Company
* @type POST
* @path /api/companies/
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.createCompany = async (req, res) => { }

/**
* @description Get Single Company info by id
* @type GET
* @path /api/companies/:id
* @param {*} req
* @param {*} res
* @param {Number} — id — company id
* @returns JSON
*/
self.get = async (req, res) => { }

/**
* @description Update Company data
* @type PUT
* @path /api/companies/:id
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.updateCompany = async (req, res) => { }

/**
* @description Delete company with the specified id in the request
* @type DELETE
* @path /api/companies/:id
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.delete = async (req, res) => { }

/**
* @description Delete all companies from the database
* @type DELETE
* @path /api/companies/:id
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.deleteAll = async (req, res) => { };

module.exports = self;

// create company funcation--------
self.createCompany = async (req, res) => {
  try {
    let data = await Company.create(req.body);
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

// get all companies funcation--------
self.getAll = async (req, res) => {
  try {
    console.log('Check-11111111111111-->');
    console.log('Check--comapny->', Company.getAttributes().status.values);
    console.log('Check-22222222222222-->');
    let data = await Company.findAll({});
    return res.status(200).json({
      success: true,
      count: data.length,
      data: data
    })
  } catch (error) {
    returnError(res, error)
  }
}

// get single company by ID funcation--------
self.get = async (req, res) => {
  console.log("status", Company.getAttributes().status.values);
  try {
    let id = req.params.id;
    let data = await Company.findByPk(id);
    if (data)
      return res.status(200).json({
        success: true,
        data: data
      })
    else
      return res.status(400).json({
        success: false,
        error: "No such company present",
        data: []
      })
  } catch (error) {
    returnError(res, error)
  }
}

// update company by ID funcation--------
self.updateCompany = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await Company.update(req.body, {where: {id: id}});
    let updatedCompany = await Company.findByPk(id);
    if (data[0] === 0) {
      return res.status(200).json({
        success: false,
        error: "No company found with this id"
      })
    }
    return res.status(200).json({
      success: true,
      data: updatedCompany,
      message: "Company update successfully"
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

// delete company by ID funcation--------
self.delete = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await Company.destroy({
      where: {
        id: id
      }
    });
    if (data === 1) {
      return res.status(200).json({
        success: true,
        message: `Company with id=${id} deleted`
      })
    } else {
      return res.status(200).json({
        success: false,
        message: `Company with id=${id} is not present.`
      })
    }
  } catch (error) {
    return res.status(200).json({
      success: false,
      error: error
    })
  }
}

// delete all companies funcation--------
self.deleteAll = async (req, res) => {
  try {
    let data = await Company.destroy({
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
