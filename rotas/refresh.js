const express = require('express');
const router = express.Router();
const refreshTokenController = require('../Controladores/refreshTokenController');

router.get('/', refreshTokenController.handleRefreshToken);

module.exports = router;