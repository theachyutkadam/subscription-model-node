// const jwt = require('jsonwebtoken');
// const models = require('./../models');

// module.exports = async (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   const token = authHeader.split(' ')[1];

//   try {
//     const url = req.originalUrl
//     if (req.params){
//       url = req.originalUrl.split('/')
//       url = url.pop()
//       url = url.join('/')
//     }
//     console.log('Check--url->', url);
//     const auth_user = jwt.verify(token, 'SECRET');
//     const user = await models.user.findOne({where: {email: auth_user.email}})
//     const authorization_data = await models.Authorization.findOne({where: {role_id: user.role_id, path: url}})
//     console.log('authorization_data--->', authorization_data);

//     req.user = auth_user;
//     if(authorization_data != null){
//       checkUserPermissions(authorization_data)
//     }

//     next()
//   } catch (error) {
//     res.status(401).json(
//       { status: 'fail', message: 'Unauthorized!'}
//     );
//   }

//   async function checkUserPermissions(authorization_data){
//     let message = `sorry! You don't have a access for this action`
//     switch (req.method) {
//       case 'GET':
//         return authorization_data.can_read ? '' : res.status(401).json({message: message})
//       case 'DELETE':
//         return authorization_data.can_read ? '' : res.status(401).json({message: message})
//       case 'POST':
//         return authorization_data.can_read ? '' : res.status(401).json({message: message})
//       case 'PUT':
//         return authorization_data.can_read ? '' : res.status(401).json({message: message})
//     }
//   }
// };
