const express = require('express');
const {
  getExpense, 
  UpdateExpense, 
  createExpense, 
  deleteExpense,
} = require('../controllers/expenses.controller')

const router = express.Router();

router.get('/:id?', getExpense)

router.post('/', createExpense)

router.put('/:id?', UpdateExpense)

router.delete('/:id?', deleteExpense)

module.exports = router;