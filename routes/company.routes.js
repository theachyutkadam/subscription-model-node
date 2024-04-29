
const auth = require('../config/authentications');
const company = require('../controllers/company.controller');
const router = require('express').Router();
console.log('Check--->');
console.log('Check--->');
console.log('Check--->');
console.log('Check--->');
console.log('Check--->');
router.get('/', company.getAll);
router.get('/:id', auth, company.get);
router.post('/', auth, company.createCompany);
router.put('/:id', auth, company.updateCompany);
router.delete('/:id', auth, company.delete);
router.delete('/', auth, company.deleteAll);
module.exports = router;