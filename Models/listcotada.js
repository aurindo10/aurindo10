const mongoose = require('mongoose') ;



const productOfList = mongoose.Schema({

    productName: {type: String, required: true, minlength: 3, maxlenght: 50},
    product_id : {type: String, required: true, minlength: 3, maxlenght: 50},
    unidade: {type: String, required: true, minlength: 1, maxlenght: 100},
    quantidade: {type: Number, required: true},
    valorUnitario: {type: Number, required: true},
    quantidadeMinima: {type: Number, required: true},
    vendedorId: {type: String, required: true, minlength: 3, maxlenght: 50},
    _id: {type: String, minlength: 3, maxlenght: 50}}) 



const priceListSchema  = mongoose.Schema({
        
        nomeDoVendedor: {type: String, required: true, minlength: 3, maxlenght: 50},
        empresa: {type: String, required: true, minlength: 1, maxlenght: 50},
        createdAt: {type: Date, default: Date.now},
        ProductListToBuy: [productOfList]
    })
const ListaPronta = mongoose.Schema({
    nomeDaCotacao: {type: String, required: true, minlength: 1, maxlenght: 50},
    listas:[priceListSchema],
    idCotacao: {type: String, required: true, minlength: 1, maxlenght: 50}
})



module.exports = mongoose.model('Listcomparada', ListaPronta)