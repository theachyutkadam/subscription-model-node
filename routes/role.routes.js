
const auth = require('../config/authentications');
const role = require('./../controllers/role.controller');
const router = require('express').Router();

router.get('/', auth, role.getAll);
router.get('/:id', auth, role.get);
router.post('/', auth, role.createRole);
router.put('/:id', auth, role.updateRole);
router.delete('/:id', auth, role.delete);
router.delete('/', auth, role.deleteAll);
module.exports = router;