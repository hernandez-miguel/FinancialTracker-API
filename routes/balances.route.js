const express = require('express');

const {
  getBalance,
  createBalance,
  updateBalance,
  deleteBalance
} = require('../controllers/balances.controller');

const router = express.Router();

router.get('/:id?', getBalance);

router.post('/', createBalance);

router.put('/:id?', updateBalance);

router.delete('/:id?', deleteBalance);

module.exports = router;