const user_information = require('../controllers/user_information.controller');
const router = require('express').Router();
router.get('/', user_information.getAll);
router.get('/:id', user_information.get);
router.post('/', user_information.createUserInformation);
router.put('/:id', user_information.updateUserInformation);
router.delete('/:id', user_information.delete);
router.delete('/', user_information.deleteAll);
module.exports = router;
