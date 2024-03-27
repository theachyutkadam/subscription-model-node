const { subscription, Sequelize } = require("./../models");
const Op = Sequelize.Op;
let self = {};

/**
* @description Get All Subscriptions
* @type GET
* @path /api/subscriptions
* @param {*} req
* @param {*} res
* @returns JSON
*/self.getAll = async (req, res) => { }


/**
* @description Create New Subscription
* @type POST
* @path /api/subscriptions/
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.createSubscription = async (req, res) => { }

/**
* @description Get Single Subscription info by id
* @type GET
* @path /api/subscriptions/:id
* @param {*} req
* @param {*} res
* @param {Number} — id — subscription id
* @returns JSON
*/
self.get = async (req, res) => { }

/**
* @description Update Subscription data
* @type PUT
* @path /api/subscriptions/:id
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.updateSubscription = async (req, res) => { }

/**
* @description Delete subscription with the specified id in the request
* @type DELETE
* @path /api/subscriptions/:id
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.delete = async (req, res) => { }

/**
* @description Delete all subscriptions from the database
* @type DELETE
* @path /api/subscriptions/:id
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.deleteAll = async (req, res) => { };

module.exports = self;

// create subscription funcation--------
self.createSubscription = async (req, res) => {
  // if (!req.body.name) {
  //   return res.status(400).send({
  //     success: false,
  //     message: "Content can not be empty!"
  //   });
  // }
  try {
    let data = await subscription.create(req.body);
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

// get all subscriptions funcation--------
self.getAll = async (req, res) => {
  try {
    let data = await subscription.findAll({});
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

// get single subscription by ID funcation--------
self.get = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await subscription.findByPk(id);
    if (data)
      return res.status(200).json({
        success: true,
        data: data
      })
    else
      return res.status(400).json({
        success: false,
        error: "No such subscription present",
        data: []
      })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error
    })
  }
}

// update subscription by ID funcation--------
self.updateSubscription = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await subscription.update(req.body, {
      where: {
        id: id
      }
    });
    if (data[0] === 0) {
      return res.status(200).json({
        success: false,
        error: "No subscription found with this id"
      })
    }
    return res.status(200).json({
      success: true,
      message: "Subscription update successfully"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error
    })
  }
}

// delete subscription by ID funcation--------
self.delete = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await subscription.destroy({
      where: {
        id: id
      }
    });
    console.log('subscription record--->', data);
    if (data === 1) {
      return res.status(200).json({
        success: true,
        message: `Subscription with id=${id} deleted`
      })
    }
    return res.status(200).json({
      success: false,
      message: `Subscription with id=${id} is not present.`
    })
  } catch (error) {
    return res.status(200).json({
      success: false,
      error: error
    })
  }
}

// delete all subscriptions funcation--------
self.deleteAll = async (req, res) => {
  try {
    let data = await subscription.destroy({
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