const express = require('express');
const router = express.Router();
const refreshTokenController = require('../Controladores/refreshTokenController');
const longincontroller = require ('../Controladores/longincontroller')

router.get('/', refreshTokenController.handleRefreshToken);
router.get('/logout', longincontroller.loggout);

module.exports = router;