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
    splited_url = req.originalUrl.split('/')
    url = splited_url[2]

    const auth_user = jwt.verify(token, 'SECRET');
    const user = await models.user.findOne({where: {email: auth_user.email}})
    if (user.status != "active") {
      return res.send(401).json({
        status: 'fail',
        message: `sorry! you are status is ${user.status}, Please contact with admin`
      });
    }
    // else {
    //   const authorization_data = await models.Authorization.findOne({where: {role_id: user.role_id, path: url}})
    //   if(authorization_data != null || req.params.id){
    //     await checkUserPermissions(authorization_data)
    //     req.user = auth_user;
    //     next()
    //   }
    // }
    req.user = user;
    next()

    // console.log('end of auth--->');
    // req.user = auth_user;
    // next()
  } catch (error) {
    console.log('Check--center error->', error);
    res.status(401).json(
      { status: 'fail', message: 'Unauthorized!'}
    );
  }

  function checkUserPermissions(authorization_data){
    let message = `sorry! You don't have a access for this action`
    if (req.method == 'GET'){
      return authorization_data.can_read ? '' : res.status(403).json({ status: false, message: message})
    }
    if (req.method == 'DELETE'){
      return authorization_data.can_delete ? '' : res.status(403).json({ status: false, message: message})
    }
    if (req.method == 'POST'){
      return authorization_data.can_write ? '' : res.status(403).json({ status: false, message: message})
    }
    if (req.method == 'PUT'){
      return authorization_data.can_update ? '' : res.status(403).json({ status: false, message: message})
    }
  }
};
