const express = require ('express')
const router = express.Router();
const auth = require('../Controladores/authcontroller')
const transferProduct = require('../Controladores/transferProduct')


router.post('/:idcotacao/:idSeller/:idproduto', express.urlencoded({extended:true}), transferProduct.transferOneProduct)
router.put('/update/:idcotacao/:idSeller/:idproduto', express.urlencoded({extended:true}), transferProduct.updateProductFromBuyList)
router.post('/:idcotacao/:idSeller/:idproduto/:idSellerInsideCotacao/:BuyListIdToAddProduct/:SellerIdToBeUpdate',express.urlencoded({extended:true}), transferProduct.addProduct)

router.get('/:idproduct/:idcotacao', express.urlencoded({extended:true}), auth, transferProduct.valueOfEachProductOnListCotada)
module.exports = router;



