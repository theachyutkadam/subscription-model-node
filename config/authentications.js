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
    // console.log('Check-********************->', req.params);
    // const url = req.originalUrl
    // if (!Number.isInteger(req.params.id)){
    //   splited_url = req.originalUrl.split('/')
    //   console.log('Check-splited_url-->', splited_url);
    //   splited_url.pop()
    //   console.log('Check-splited_url after pop-->', splited_url);
    //   url = splited_url.join('/')
    //   url.toString()
    // }

    const auth_user = jwt.verify(token, 'SECRET');
    const user = await models.user.findOne({where: {email: auth_user.email}})
    // console.log('Check--url->', url);
    // const authorization_data = await models.Authorization.findOne({where: {role_id: user.role_id, path: url}})

    if (user.status != "active") {
      return res.status(401).json({
        message: `sorry! you are status is ${user.status}, Please contact with admin`
      });
    // } else if(authorization_data != null || req.params.id){
    //   await checkUserPermissions(authorization_data)
    } else {
      req.user = auth_user;
      next()
    }

  } catch (error) {
    console.log('Check--center error->', error);
    res.status(401).json(
      { status: 'fail', message: 'Unauthorized!'}
    );
  }

  // function checkUserPermissions(authorization_data){
  //   let message = `sorry! You don't have a access for this action`
  //   if (req.method == 'GET'){
  //     return authorization_data.can_read ? '' : res.status(401).json({message: message})
  //   }
  //   if (req.method == 'DELETE'){
  //     return authorization_data.can_read ? '' : res.status(401).json({message: message})
  //   }
  //   if (req.method == 'POST'){
  //     return authorization_data.can_read ? '' : res.status(401).json({message: message})
  //   }
  //   if (req.method == 'PUT'){
  //     return authorization_data.can_read ? '' : res.status(401).json({message: message})
  //   }
  // }
};
