const plan = require('../controllers/plan.controller');
const router = require('express').Router();
router.get('/', plan.getAll);
router.get('/:id', plan.get);
router.post('/', plan.createPlan);
router.put('/:id', plan.updatePlan);
router.delete('/:id', plan.delete);
router.delete('/', plan.deleteAll);
module.exports = router;
