const auth = require('../config/authentications');
const user_information = require('../controllers/user_information.controller');
const router = require('express').Router();

router.get('/', auth, user_information.getAll);
router.get('/:id', auth, user_information.get);
router.post('/', auth, user_information.createUserInformation);
router.put('/:id', auth, user_information.updateUserInformation);
router.delete('/:id', auth, user_information.delete);
router.delete('/', auth, user_information.deleteAll);
module.exports = router;
