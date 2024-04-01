const auth = require('../config/authentications');
const authorization = require('../controllers/authorization.controller');
const router = require('express').Router();

router.get('/', auth, authorization.getAll);
router.get('/:id', auth, authorization.get);
router.post('/', auth, authorization.createAuthorization);
router.put('/:id', auth, authorization.updateAuthorization);
router.delete('/:id', auth, authorization.delete);
router.delete('/', auth, authorization.deleteAll);
module.exports = router;
