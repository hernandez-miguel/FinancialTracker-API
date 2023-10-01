const express = require('express');
const ROLES_LIST = require('../config/rolesList');
const verifyRoles = require('../middleware/verifyRoles.middleware');
const { getAllAccounts, getAccountsByUser } = require('../controllers/accounts.controller');
const { createAccount, updateAccount, deleteAccount } = require('../controllers/accounts.controller');

const router = express.Router();

router.get('/', verifyRoles(ROLES_LIST.Admin), getAllAccounts);
router.get('/:id', verifyRoles(ROLES_LIST.User), getAccountsByUser);
router.post('/:id', verifyRoles(ROLES_LIST.User), createAccount);
router.put('/:id', verifyRoles(ROLES_LIST.User), updateAccount);
router.delete('/:id', verifyRoles(ROLES_LIST.User), deleteAccount);

module.exports = router;