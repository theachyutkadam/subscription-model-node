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

  console.log('header token', authHeader);
  const token = authHeader.split(' ')[1];
  try {
    const user = jwt.verify(token, 'SECRET');
    const user_data = await models.user.findOne({where: {email: user.email}})
    if (user_data.status == "active") {
      req.user = user;
      next();
    } else {
      return res.status(401).json({
        message: `sorry! you are status is ${user_data.status}, Please contact with admin`
      });
    }
  } catch (error) {
    res.status(401).json(
      { status: 'fail', message: 'Unauthorized!'}
    );
  }
};
