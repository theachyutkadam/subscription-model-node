const role = require('./../controllers/role.controller');
const router = require('express').Router();
router.get('/', role.getAll);
router.get('/:id', role.get);
router.post('/', role.createRole);
router.put('/:id', role.updateRole);
router.delete('/:id', role.delete);
router.delete('/', role.deleteAll);
module.exports = router;