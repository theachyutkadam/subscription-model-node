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
    const url = req.originalUrl
    const auth_user = jwt.verify(token, 'SECRET');
    const user = await models.user.findOne({where: {email: auth_user.email}})
    const authorization_data = await models.Authorization.findOne({where: {role_id: user.role_id, path: url}})

    req.user = auth_user;
    checkUserStatus(user)

    if(authorization_data != null){
      checkAuthorization(authorization_data)
    }
    next()
  } catch (error) {
    res.status(401).json(
      { status: 'fail', message: 'Unauthorized!'}
    );
  }

  // Check user status
  function checkUserStatus(user) {
    console.log('Check---status>', user.status != "active");
    if (user.status != "active") {
      return res.status(401).json({
        message: `sorry! you are status is ${user.status}, Please contact with admin`
      });
    }
  }

  function checkAuthorization(authorization_data){
    // Check user access
    checkUserPermissions(authorization_data)
  }

  async function checkUserPermissions(authorization_data){
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
  }
};
