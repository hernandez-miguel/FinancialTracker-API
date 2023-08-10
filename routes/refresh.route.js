const express = require('express');
const router = express.Router();
const refreshController = require('../controllers/refreshToken.controller');

router.get('/', refreshController.handleRefreshToken);

module.exports = router;