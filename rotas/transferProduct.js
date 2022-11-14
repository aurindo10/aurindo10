const express = require ('express')
const router = express.Router();
const auth = require('../Controladores/authcontroller')
const transferProduct = require('../Controladores/transferProduct')

router.get('/:idproduct/:idcotacao', express.urlencoded({extended:true}), auth, transferProduct.valueOfEachProductOnListCotada)

module.exports = router;



