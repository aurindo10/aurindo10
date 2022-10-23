const express = require ('express')
const router = express.Router();
const login = require('../Controladores/longincontroller')


router.post('/registrar', express.urlencoded({extended:true}), login.register)
router.post('/login', express.urlencoded({extended:true}), login.login)

module.exports = router;