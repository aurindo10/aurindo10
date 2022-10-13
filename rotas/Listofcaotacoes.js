const express = require ('express')
const router = express.Router();
const controller  = require('../Controladores/priceListController')
const comparador = require('../Controladores/comparador')


router.post('/cadastrodelistadeprecos', express.urlencoded({extended:true}), controller.cadastro)
router.get('/', express.urlencoded({extended:true}), controller.list)
router.get('/listdepreco/:id', express.urlencoded({extended:true}), controller.onelist)
router.post('/listdepreco/:id', express.urlencoded({extended:true}), controller.updatelist)
router.delete('/listdepreco/:id', express.urlencoded({extended:true}), controller.deletelist)
router.get('/compara/:id', express.urlencoded({extended:true}), comparador.compara)
router.put('/cadastravendedor', express.urlencoded({extended:true}), controller.cadastraVendedor)




module.exports = router;