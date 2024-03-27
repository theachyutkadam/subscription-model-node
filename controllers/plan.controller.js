const { plan, Sequelize } = require("./../models");
const Op = Sequelize.Op;
let self = {};

/**
* @description Get All Plans
* @type GET
* @path /api/plans
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.getAll = async (req, res) => { }

/**
* @description Create New Plan
* @type POST
* @path /api/plans/
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.createPlan = async (req, res) => { }

/**
* @description Get Single Plan info by id
* @type GET
* @path /api/plans/:id
* @param {*} req
* @param {*} res
* @param {Number} — id — plan id
* @returns JSON
*/
self.get = async (req, res) => { }

/**
* @description Update Plan data
* @type PUT
* @path /api/plans/:id
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.updatePlan = async (req, res) => { }

/**
* @description Delete plan with the specified id in the request
* @type DELETE
* @path /api/plans/:id
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.delete = async (req, res) => { }

/**
* @description Delete all plans from the database
* @type DELETE
* @path /api/plans/:id
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.deleteAll = async (req, res) => { };

module.exports = self;

// create plan funcation--------
self.createPlan = async (req, res) => {
  // if (!req.body.name) {
  //   return res.status(400).send({
  //     success: false,
  //     message: "Content can not be empty!"
  //   });
  // }
  try {
    let data = await plan.create(req.body);
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

// get all plans funcation--------
self.getAll = async (req, res) => {
  try {
    let data = await plan.findAll({});
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

// get single plan by ID funcation--------
self.get = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await plan.findByPk(id);
    if (data)
      return res.status(200).json({
        success: true,
        data: data
      })
    else
      return res.status(400).json({
        success: false,
        error: "No such plan present",
        data: []
      })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error
    })
  }
}

// update plan by ID funcation--------
self.updatePlan = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await plan.update(req.body, {
      where: {
        id: id
      }
    });
    if (data[0] === 0) {
      return res.status(200).json({
        success: false,
        error: "No plan found with this id"
      })
    }
    return res.status(200).json({
      success: true,
      message: "Plan update successfully"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error
    })
  }
}

// delete plan by ID funcation--------
self.delete = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await plan.destroy({
      where: {
        id: id
      }
    });
    console.log('plan record--->', data);
    if (data === 1) {
      return res.status(200).json({
        success: true,
        message: `Plan with id=${id} deleted`
      })
    }
    return res.status(200).json({
      success: false,
      message: `Plan with id=${id} is not present.`
    })
  } catch (error) {
    return res.status(200).json({
      success: false,
      error: error
    })
  }
}

// delete all plans funcation--------
self.deleteAll = async (req, res) => {
  try {
    let data = await plan.destroy({
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