const auth = require('../config/authentications');
const plan = require('../controllers/plan.controller');
const router = require('express').Router();

router.get('/', auth, plan.getAll);
router.get('/:id', auth, plan.get);
router.post('/', auth, plan.createPlan);
router.put('/:id', auth, plan.updatePlan);
router.delete('/:id', auth, plan.delete);
router.delete('/', auth, plan.deleteAll);
module.exports = router;
