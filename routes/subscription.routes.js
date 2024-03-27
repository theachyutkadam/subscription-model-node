const subscription = require('../controllers/subscription.controller');
const router = require('express').Router();
router.get('/', subscription.getAll);
router.get('/:id', subscription.get);
router.post('/', subscription.createSubscription);
router.put('/:id', subscription.updateSubscription);
router.delete('/:id', subscription.delete);
router.delete('/', subscription.deleteAll);
module.exports = router;
