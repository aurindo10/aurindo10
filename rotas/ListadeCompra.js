const express = require ('express')
const router = express.Router();
const controller = require('../Controladores/controller')
const auth = require('../Controladores/authcontroller')
const adminAuth = require('../Controladores/adminauthcontroller')

router.post('/cadastro',express.urlencoded({extended:true}), controller.cadastro); 
router.get('/cotacoes/', express.urlencoded({extended:true}),auth, controller.ObtemListofLists)
router.delete('/cadastro/:id',express.urlencoded({extended:true}),auth, controller.deleteproduct); 
router.post('/cadastrodelista/:id', express.urlencoded({extended:true}),auth, controller.criarProdutosDaLista);
router.post('/cadastrodelista', express.urlencoded({extended:true}),auth, controller.criarListdeCotação);
router.get('/cotacoes/:id', express.urlencoded({extended:true}), controller.ObtemProdutosDaLista )
router.delete('/cotacoes/:id', express.urlencoded({extended:true}),auth, controller.deletecotacao )
router.get('/productslist', express.urlencoded({extended:true}),auth, controller.products)
router.get('/product/:id', express.urlencoded({extended:true}),auth, controller.product)
router.post('/editproduct/:id', express.urlencoded({extended:true}),auth, controller.editProduct)
router.post('/editlist/:idlist/:id', express.urlencoded({extended:true}),auth, controller.editProductsList)
router.post('/updatedelista/:id', express.urlencoded({extended:true}),auth, controller.editListCotacao)
router.post('/criacaodelista', express.urlencoded({extended:true}),auth, controller.criacaodelista)
router.delete('/cotacoes/:id/:id_product', express.urlencoded({extended:true}),auth, controller.deleteproductofcotacao)
module.exports = router;