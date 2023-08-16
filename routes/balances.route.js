const express = require('express');
const ROLES_LIST = require('../config/rolesList');
const verifyRoles = require('../middleware/verifyRoles.middleware');
const { getBalance, createBalance, updateBalance, deleteBalance } = require('../controllers/balances.controller');
const router = express.Router();

router.get('/:id?', verifyRoles(ROLES_LIST.Admin), getBalance);
router.post('/', verifyRoles(ROLES_LIST.User), createBalance);
router.put('/:id?', verifyRoles(ROLES_LIST.User), updateBalance);
router.delete('/:id?', verifyRoles(ROLES_LIST.User), deleteBalance);

module.exports = router;