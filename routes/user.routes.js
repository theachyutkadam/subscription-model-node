const auth = require('../config/authentications');
const user = require('./../controllers/user.controller');
const router = require('express').Router();

// authentication/onboarding process
router.post('/login', user.loginUser);
router.post('/', user.createUser);
router.get('/activation/:token', user.activateUser);

// update password/forgot password process
router.post('/forgot_password', user.sendForgotPasswordLink);
router.post('/update_password/:token', user.updatePassword);

router.get('/', auth, user.getAll);
router.get('/:id', auth, user.get);
router.put('/:id', auth, user.updateUser);
router.delete('/:id', auth, user.delete);
router.delete('/', auth, user.deleteAll);

module.exports = router;
