const express = require ('express')
const router = express.Router();
const login = require('../Controladores/longincontroller')
const auth = require ('../Controladores/authcontroller')
const authAdmin = require ('../Controladores/adminauthcontroller')


router.get('/admin',express.urlencoded({extended:true}), authAdmin, (req,res)=>{
    
    res.send ("admin")
    
}  )

module.exports = router;

