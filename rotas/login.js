const express = require ('express')
const router = express.Router();
const login = require('../Controladores/longincontroller')


router.post('/registrar', express.urlencoded({extended:true}), login.register)

module.exports = router;