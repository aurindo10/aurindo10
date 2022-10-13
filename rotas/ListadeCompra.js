const express = require ('express')
const router = express.Router();
const controller = require('../Controladores/controller')

router.post('/cadastro',express.urlencoded({extended:true}), controller.cadastro); 
router.delete('/cadastro/:id',express.urlencoded({extended:true}), controller.deleteproduct); 
router.post('/cadastrodelista/:id', express.urlencoded({extended:true}), controller.criarProdutosDaLista);
router.post('/cadastrodelista', express.urlencoded({extended:true}), controller.criarListdeCotação);
router.get('/cotacoes/:id', express.urlencoded({extended:true}), controller.ObtemProdutosDaLista )
router.delete('/cotacoes/:id', express.urlencoded({extended:true}), controller.deletecotacao )
router.get('/productslist', express.urlencoded({extended:true}), controller.products)
router.get('/product/:id', express.urlencoded({extended:true}), controller.product)
router.post('/editproduct/:id', express.urlencoded({extended:true}), controller.editProduct)
router.post('/editlist/:idlist/:id', express.urlencoded({extended:true}), controller.editProductsList)
router.post('/updatedelista/:id', express.urlencoded({extended:true}), controller.editListCotacao)
router.post('/criacaodelista', express.urlencoded({extended:true}), controller.criacaodelista)
router.get('/cotacoes/', express.urlencoded({extended:true}), controller.ObtemListofLists)
router.delete('/cotacoes/:id/:id_product', express.urlencoded({extended:true}), controller.deleteproductofcotacao)
module.exports = router;