const jwt = require('jsonwebtoken');
const models = require('./../models');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.includes('Bearer')) {
    return res.status(401).json({
      status: 'fail',
      message: 'Unauthorized, invalid token!',
    });
  }
  const token = authHeader.split(' ')[1];

  try {
    // console.log('Ori URL-->', req.originalUrl);
    // console.log('request-->', req);
    const url = req.originalUrl
    // const split_url = url.split("/")
    // console.log('Check-split_url-->', split_url);
    // const id = req.params.id
    // console.log('Check--params->', req.params);
    // if(req.params.id == id) {
    //   // split_url.pop()
    //   // url = split_url.join('/')
    //   url = url.replace(`/${id}`, '')
    //   console.log('with params->', url.replace(`/${id}`, ''));
    // } else {
    //   console.log('not params->', url);
    // }

    const user = jwt.verify(token, 'SECRET');
    const user_data = await models.user.findOne({where: {email: user.email}})
    const authorization_data = await models.Authorization.findOne({where: {role_id: user_data.role_id, path: url}})

    // Check user status
    if (!user_data.status == "active") {
      return res.status(401).json({
        message: `sorry! you are status is ${user_data.status}, Please contact with admin`
      });
    }

  // Check user access
    let message = `sorry! You don't have a access for this action`

    switch (req.method) {
      case 'GET':
        return authorization_data.can_read ? '' : res.status(401).json({message: message})
      case 'DELETE':
        return authorization_data.can_read ? '' : res.status(401).json({message: message})
      case 'POST':
        return authorization_data.can_read ? '' : res.status(401).json({message: message})
      case 'PUT':
        return authorization_data.can_read ? '' : res.status(401).json({message: message})
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json(
      { status: 'fail', message: 'Unauthorized!'}
    );
  }
};
