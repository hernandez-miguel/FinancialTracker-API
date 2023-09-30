const express = require('express');
const ROLES_LIST = require('../config/rolesList');
const verifyRoles = require('../middleware/verifyRoles.middleware');
const { getAllExpenses, getExpense } = require('../controllers/expenses.controller')
const { updateExpense, createExpense, deleteExpense } = require('../controllers/expenses.controller')

const router = express.Router();

router.get('/', verifyRoles(ROLES_LIST.Admin), getAllExpenses)
router.get('/:id', verifyRoles(ROLES_LIST.User), getExpense)
router.post('/:id', verifyRoles(ROLES_LIST.User), createExpense);
router.put('/:id', verifyRoles(ROLES_LIST.User), updateExpense);
router.delete('/:id', verifyRoles(ROLES_LIST.User), deleteExpense);

module.exports = router;