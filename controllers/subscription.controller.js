const { subscription, Sequelize } = require("./../models");
const models = require('./../models');

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
  let plan = await models.plan.findByPk(req.body.plan_id);

  const subscriptionPayload = {
    activation_date: req.body.activation_date,
    expired_date: req.body.expired_date,
    plan_id: req.body.plan_id,
    user_id: req.body.user_id,
    plan_price: plan.price
  };

  try {
    let data = await subscription.create(subscriptionPayload);
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

// get all subscriptions funcation--------
self.getAll = async (req, res) => {
  try {
    let data = await subscription.findAll({
      include: [
        {model: models.user, required: true},
        {model: models.plan, required: true}
      ]
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

// get single subscription by ID funcation--------
self.get = async (req, res) => {
  try {
    // let id = req.params.id;
    let data = await subscription.findByPk(req.params.id, {
      include: [
        {model: models.user, required: true},
        {model: models.plan, required: true}
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
        error: "No such subscription present",
        data: []
      })
  } catch (error) {
    returnError(res, error)
  }
}

// update subscription by ID funcation--------
self.updateSubscription = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await subscription.update(req.body, {where: {id: id}});
    let updatedSubscription = await subscription.findByPk(id, {
      include: [
        {model: models.user, required: true},
        {model: models.plan, required: true}
      ]
    });

    if (data[0] === 0) {
      return res.status(200).json({
        success: false,
        error: "No subscription found with this id"
      })
    }
    return res.status(200).json({
      success: true,
      data: updatedSubscription,
      message: "Subscription update successfully"
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
    } else {
      return res.status(200).json({
        success: false,
        message: `Subscription with id=${id} is not present.`
      })
    }
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
    returnError(res, error)
  }
};

function returnError(res, error) {
  res.status(500).json({
    success: false,
    error: error
  })
}
