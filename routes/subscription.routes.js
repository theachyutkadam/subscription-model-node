const auth = require('../config/authentications');
const subscription = require('../controllers/subscription.controller');
const router = require('express').Router();

router.get('/', auth, subscription.getAll);
router.get('/:id', auth, subscription.get);
router.post('/', auth, subscription.createSubscription);
router.put('/:id', auth, subscription.updateSubscription);
router.delete('/:id', auth, subscription.delete);
router.delete('/', auth, subscription.deleteAll);
module.exports = router;
